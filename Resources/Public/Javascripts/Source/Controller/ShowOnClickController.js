/**
 * @typedef {Object} ShowOnClickController~settings
 * @property {string} [linkSelector = '.tx-locationmanager-show'] - The amount of throttling to apply
 */

/**
 * Zooms to a marker whenever the showlink is being clicked.
 * Also opens the infowindow, if the infowindow controller is being used
 *
 * @implements LocationManagerControllerInterface
 */

class ShowOnClickController {

    /**
     * @type {ShowOnClickController~settings}
     */
    settings;

    /**
     * @param {ShowOnClickController~settings} settings
     */
    constructor(settings) {
        settings = settings || {};
        settings.linkSelector = settings.linkSelector || '.location-manager__location__show';
        this.settings = settings;
    }

    /**
     * Initializes the handlers
     *
     * @param {LocationManager} locationManager
     */
    init(locationManager) {
        locationManager.marker.forEach(marker => {
            let links = marker.element.querySelectorAll(this.settings.linkSelector);
            for (let i = 0; i < links.length; i++) {
                links[i].addEventListener('click', this.onShowLinkClick.bind(this, marker, locationManager));
            }
        });
    }

    onMapMove() {}

    onMarkerClick() {}

    /**
     * Method that is executed whenever the show link on an element is being clicked
     *
     * @param {LocationManager~marker} marker
     * @param {LocationManager} locationManager
     * @private
     */
    onShowLinkClick(marker, locationManager) {
        locationManager._settings.mapContainer.scrollIntoView(true);

        /** @var {InfoWindowController} */
        let infoWindowController = locationManager.getController(InfoWindowController);
        if (infoWindowController) {
            // let infoWindowController handle the zooming and panning, if it is available
            infoWindowController.onMarkerClick(marker, true);
        } else {
            // zoom and pan manually if it is not available (fallback)
            locationManager.map.setCenter(marker.marker.getPosition());
            locationManager.map.setZoom(10);
        }
    }

    preprocess() {}

}

LocationManagerControllerFactory.register('showOnClick', ShowOnClickController);