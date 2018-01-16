/**
 * @typedef {Object} LocationManager~settings
 * @property {Element|string} mapContainer - The container, that the map will be rendered in
 * @property {google.maps.MapOptions} [mapOptions] - Additional options for google maps
 *           see {@link https://developers.google.com/maps/documentation/javascript/reference#MapTypeId}
 * @property {boolean} [debug = false] - Whether or not to enable debugging
 * @property {Node|string} [markerContainer] - Container of the elements.
 * @property {NodeList|Node[]|string} [markerElements] - Elements that are used to generate markers
 * @property {string} [longAttribute = 'data-longitude'] - Attribute on the markerElement that contains the longitude
 * @property {string} [latAttribute = 'data-latitude'] - Attribute on the markerElement that contains the latitude
 * @property {string} [fixedAttribute = 'data-fixed'] - Attribute that determines whether or not an attribute is fixed
 * @property {MarkerClustererOptions} [clusterer] - Clusterer settings, set to false, if clusterer should be disabled
 *
 * @property {Object} [controllerFactory] - settings for controller initialization: The keys are names of the controllers, the
 *                                          values will be passed to the Constructor
 * @property {boolean} [centerOnMarkers = true] - Whether or not to initially adjust the zoom to include all markers. Note ,that this settings will be automatically
 *                                              turned on, if no map center was given
 * @property {string} [markerIcon] - The icon to use for the markers
 */


import { throttle } from './EventHelpers';
import MarkerClusterer from 'js-marker-clusterer';
import { LocationManagerControllerFactory } from './LocationManagerControllerFactory';
import { applyObjectDefaults } from './Library/ObjectUtility';
import { DynamicMarkerImageController } from './Controller/DynamicMarkerImageController';
import { InfoWindowController } from './Controller/InfoWindowController';
import { RefreshListOnMoveController } from './Controller/RefreshListOnMoveController';
import { ShowOnClickController } from './Controller/ShowOnClickController';
import { SortByDistanceController } from './Controller/SortByDistanceController';
import { ClickToEnableController } from './Controller/ClickToEnableController';
import { HideMapOnMobileController } from './Controller/HideMapOnMobileController';
import { AutocompletedSearchController } from './Controller/AutocompletedSearchController';
import { TagFilterController } from './Controller/TagFilterController';

/*
 * Default controller setup
 */
LocationManagerControllerFactory.register('autocompletedSearch', AutocompletedSearchController);
LocationManagerControllerFactory.register('clickToEnable', ClickToEnableController);
LocationManagerControllerFactory.register('dynamicMarkerImage', DynamicMarkerImageController);
LocationManagerControllerFactory.register('hideMapOnMobile', HideMapOnMobileController);
LocationManagerControllerFactory.register('infoWindow', InfoWindowController);
LocationManagerControllerFactory.register('refreshListOnMove', RefreshListOnMoveController);
LocationManagerControllerFactory.register('showOnClick', ShowOnClickController);
LocationManagerControllerFactory.register('sortByDistance', SortByDistanceController);
LocationManagerControllerFactory.register('tagFilter', TagFilterController);

/**
 * @typedef {Object} LocationManager~marker
 * @property {HTMLElement} element - The DOM element of this marker in the DOM
 * @property {google.maps.Marker} marker - The marker object in the list
 *
 * @property {boolean} [showInList] - Whether or not the marker should be displayed in the list
 * @property {boolean} [showOnMap] - Whether or not the marker should be displayed on the map
 * @property {boolean} [fixed] - Whether or not the marker is fixed (should not be effected by sorting & hiding
 */

export class LocationManager {

    /**
     * @type {google.maps.Map}
     */
    map;

    /**
     * @type {LocationManager~marker[]}
     */
    marker = [];


    /**
     * @param {LocationManager~settings} settings
     */
    constructor(settings) {
        this._settings = this._prepareSettings(settings);
        this._log(this._settings);

        this._initializeMap();
        this._initializeMarker();
        // wait for google maps initialization
        let listenerHandle = google.maps.event.addListener(this.map, 'bounds_changed', () => {
            this._initializeControllers();
            google.maps.event.removeListener(listenerHandle);
        });

        if (this._settings.centerOnMarkers) {
            this.centerMapOnShownMarkers();
        }
    }

    /**
     * adjusts the map bounds in a way, that all current markers are visible
     * on the map
     * @returns {void}
     */
    centerMapOnShownMarkers() {
        var bounds = new google.maps.LatLngBounds();

        this._markerClusterer.getMarkers().forEach(function (marker) {
            if (!isNaN(parseFloat(marker.getPosition().lat())) && !isNaN(parseFloat(marker.getPosition().lng()))) {
                bounds = bounds.extend(marker.getPosition());
            }
        });

        this.map.fitBounds(bounds);
    }

    /**
     * Method that is executed everytime a user moves the map
     * @returns {void}
     */
    onMapMove() {
        this._controllers.forEach(controller => {
            controller.onMapMove();
        });
    }

    /**
     * Method that is executed everytime a user clicks on a marker
     * @param {LocationManager~marker} marker
     */
    onMarkerClick(marker) {
        this._log('onMarkerClick', marker);
        this._controllers.forEach(controller => {
            controller.onMarkerClick(marker);
        });
    }

    /**
     * Updates the marker that are visible on map
     * @returns {void}
     */
    updateMap() {
        this._log('updateMap');
        const markerToShow = this._getProcessedMarker().filter(marker => {
            return marker.showOnMap;
        }).map(marker => {
            return marker.marker;
        });

        this._markerClusterer.clearMarkers();
        this._markerClusterer.addMarkers(markerToShow);
    }

    /**
     * Updates the marker that should be visible in the list
     * @returns {void}
     */
    updateList() {
        this._log('updateList');

        let child = this._settings.markerContainer.firstChild;
        while (child) {
            this._settings.markerContainer.removeChild(child);
            child = this._settings.markerContainer.firstChild;
        }

        this._getProcessedMarker().forEach(marker => {
            if (marker.fixed) { return; }
            if (marker.showInList) {
                this._settings.markerContainer.appendChild(marker.element);
            }
        });
    }

    /**
     * Adds a new controller to the LocationManager
     * @param {LocationManagerControllerInterface} controller
     */
    addController(controller) {
        this._log('addController', controller);
        this._controllers.push(controller);
        // execute init method in promise
        new Promise(controller.init.bind(controller, this));
    }

    /**
     * Get's the controller with the given type that is associated with the current instance
     * Returns null, if no controller with that type was found
     *
     * @example
     * locationManager.getController(InfoWindowController)
     *
     * @returns {LocationManagerControllerInterface}
     */
    getController(Constructor) {
        for (let controller of this._controllers) {
            if (controller instanceof Constructor) {
                return controller;
            }
        }
        return null;
    }

    /**
     * Prepares the settings: sets defaults and converts datatypes.
     * Returns an settings object that is usable within this class
     *
     * @param settings
     * @return {*}
     * @private
     */
    _prepareSettings(settings) {
        settings = settings || {};
        const DEFAULTS = {
            longAttribute: 'data-longitude',
            latAttribute: 'data-latitude',
            fixedAttribute: 'data-fixed',
            mapOptions: {
                center: {
                    lat: 47.920130,
                    lng: 7.705250
                },
                zoom: 10,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_CENTER
                },
            },
            clusterer: {
                gridSize: 60,
                zoomOnClick: true,
                styles: [{
                    url: '/typo3conf/ext/location_manager/Resources/Public/Images/Cluster.png',
                    width: 53,
                    height: 52,
                    textColor: '#000'
                }]
            },
            controllerFactory: {},
            debug: false,
            centerOnMarkers: false
        };

        // if no correct center was given, the map will be initialized with a set of coordinates but be zoomed
        // to fit the markers right away.
        if (!settings.mapOptions || !settings.mapOptions.center || !settings.mapOptions.center.lat || !settings.mapOptions.center.lng) {
            settings.centerOnMarkers = true;
        }

        // if no correct center was given, the map will be initialized with a set of coordinates but be zoomed
        // to fit the markers right away.
        // if (!settings.mapOptions || !settings.mapOptions.center || !settings.mapOptions.center.lat || !settings.mapOptions.center.lng) {
        //    settings.zoomToMarkers = true;
        // }

        settings = applyObjectDefaults(settings, DEFAULTS);

        // All DOM Elements in the settings can be supplied as strings which will have to be initialized
        const domSettings = ['markerElements'];
        const singleDomSettings = ['mapContainer', 'markerContainer'];

        singleDomSettings.forEach(setting => {
            if (typeof settings[setting] === 'string') { settings[setting] = document.querySelector(settings[setting]); }
        });
        domSettings.forEach(setting => {
            if (typeof settings[setting] === 'string') { settings[setting] = document.querySelectorAll(settings[setting]); }
        });

        if (!settings.markerContainer && !settings.markerElements) {
            throw new Error ('At least one of markerContainer or markerElements must be specified');
        } else if (settings.markerElements && !settings.markerContainer) {
            settings.markerContainer = settings.markerElements[0].parentNode;
        } else if (settings.markerContainer && !settings.markerElements) {
            settings.markerElements = settings.markerContainer.childNodes;
        }

        // NodeList to Node[]
        settings.markerElements = Array.prototype.slice.call(settings.markerElements);

        return settings;
    }

    /**
     * @type {MarkerClusterer}
     */
    _markerClusterer;


    /**
     * @type {LocationManager~settings}
     */
    _settings;

    /**
     *
     * @type {LocationManagerControllerInterface[]}
     * @private
     */
    _controllers = [];


    /**
     * Simple abstraction over logging for LocationManager:
     * If the 'debug' setting is set to 'true', all arguments will be prefixed with 'LocationManager' and
     * then logged in the console
     *
     * @private
     */
    _log() {
        if (!this._settings.debug) {
            return;
        }
        let args = Array.prototype.slice.call(arguments);
        args.unshift('LocationManager');

        // eslint-disable-next-line no-console
        console.log.apply(console, args);
    }

    /**
     * Initializes the map with all settings
     *
     * @private
     */
    _initializeMap() {
        this._log('_initializeMap', this._settings.mapContainer, this._settings.mapOptions);

        const map = new google.maps.Map(
            this._settings.mapContainer,
            this._settings.mapOptions
        );
        map.addListener('bounds_changed', throttle(() => this.onMapMove(), 20));

        this.map = map;
        this._log('_initializeMap', map);
    }

    /**
     * Initializes the marker array in this._marker and the clusterer.
     *
     * @private
     */
    _initializeMarker() {
        this._log('_initializeMarker');
        const googleMapsMarkers = [];

        // initialize markers
        this._settings.markerElements.forEach(markerElement => {
            let lat = parseFloat(markerElement.getAttribute(this._settings.latAttribute));
            let lng = parseFloat(markerElement.getAttribute(this._settings.longAttribute));

            if (isNaN(lat) || isNaN(lng)) {
                console.warn('LocationManager', 'marker has at least one undefined coordinate', { lat: lat, lng: lng }, markerElement, this);
            }

            let markerSettings = {
                map: this.map,
                icon: this._settings.markerIcon,
                position: {
                    lat: lat || 0,
                    lng: lng || 0
                }
            };
            this._log('_initializeMarker', markerSettings);
            /**
             * @type {LocationManager~marker}
             */
            let marker = {
                element: markerElement,
                marker: new google.maps.Marker(markerSettings),
                showOnMap: true,
                showInList: true,
                fixed: !!markerElement.getAttribute(this._settings.fixedAttribute)
            };
            marker.marker.addListener('click',() => {
                this.onMarkerClick(marker);
            });
            this.marker.push(marker);
            googleMapsMarkers.push(marker.marker);
        });

        // initialize marker clusterer
        if (this._settings.clusterer !== false) {
            this._markerClusterer = new MarkerClusterer(this.map, googleMapsMarkers, this._settings.clusterer);
            this._log('_initializeMarker', this._markerClusterer);
        }
    }

    /**
     * Initializes the controllers out of the controllerFactory setting
     * @private
     */
    _initializeControllers() {
        this._log('_initializeControllers');
        Object.keys(this._settings.controllerFactory).forEach(name => {
            const controller = LocationManagerControllerFactory.make(name, this._settings.controllerFactory[name]);
            if (controller !== null) {
                this.addController(controller);
            } else {
                console.warn('LocationManager', 'No controller ' + name + ' exists, skipping');
            }
        });
    }

    /**
     * Returns the markers with the necessary preprocessing applied.
     * This method should never be called in the controllers themselves as this could lead to loops.
     *
     * @return {LocationManager~marker[]}
     * @private
     */
    _getProcessedMarker() {
        this._log('_getProcessedMarker');
        this._controllers.forEach(controller => {
            controller.preprocess(this.marker);
        });

        return this.marker;
    }
}


