/**
 * @typedef {Object} InfoWindowController~settings
 * @property {string} [selector = '.js-infoWindow'] - selector that is used to get the content of the infowindow inside of the marker list element
 */

/**
 * Implements the InfoWindow popup
 *
 * @implements LocationManagerControllerInterface
 */

class InfoWindowController {

    /**
     * @type {google.maps.InfoWindow}
     */
    infoWindow;

    /**
     * @type {InfoWindowController~settings}
     */
    settings;

    /**
     * @type {LocationManager}
     */
    locationManager;

    /**
     * @type {LocationManager~marker}
     */
    currentMarker;

    /**
     * @param {InfoWindowController~settings} settings
     */
    constructor(settings) {
        settings = settings || {};
        settings.selector = settings.selector || '.location-manager__location__info-window';

        this.settings = settings;
    }

    /**
     * @param {LocationManager} locationManager
     */
    init(locationManager) {
        this.locationManager = locationManager;

        // initialize infowindow
        this.infoWindow = new google.maps.InfoWindow({ content: '' });
        this.infoWindow.addListener('closeclick', this.onInfoWindowClose.bind(this));
    }

    /**
     * @param {LocationManager~marker} marker
     * @param {boolean} doNotFilterList
     */
    onMarkerClick(marker, doNotFilterList) {
        this.addCurrentMarkerToClusterer();

        this.locationManager._markerClusterer.removeMarker(marker.marker);
        marker.marker.setMap(this.locationManager.map);
        this.currentMarker = marker;

        if (this.locationManager.map.getZoom() < 10) {
            this.locationManager.map.setZoom(10);
        }
        this.locationManager.map.panTo(marker.marker.getPosition());
        this.infoWindow.setContent(marker.element.querySelector(this.settings.selector).innerHTML);
        this.infoWindow.open(this.locationManager.map, marker.marker);

        if (!doNotFilterList) {
            this.locationManager.marker.forEach(marker => {
                marker.showInList = false;
            });
            marker.showInList = true;
            this.locationManager.updateList();
        }
    }

    /**
     * Callback that is executed, when the InfoWindow is closed.
     */
    onInfoWindowClose() {
        this.addCurrentMarkerToClusterer();
    }

    addCurrentMarkerToClusterer() {
        if (!this.currentMarker) {
            return;
        }
        this.locationManager._markerClusterer.addMarker(this.currentMarker.marker);
        this.currentMarker = null;
    }

    onMapMove() {}

    preprocess() {}

}

LocationManagerControllerFactory.register('infoWindow', InfoWindowController);