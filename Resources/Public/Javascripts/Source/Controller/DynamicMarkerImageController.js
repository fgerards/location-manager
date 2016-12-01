/**
 * @typedef {Object} DynamicMarkerImageController~settings
 * @property {string|Node} [attribute = 'data-marker'] - The field that should be shown when enabled
 */

/**
 * Enables the use of dynamic marker icons
 *
 * @implements LocationManagerControllerInterface
 */

class DynamicMarkerImageController {

    /**
     * @type {DynamicMarkerImageController~settings}
     */
    settings;

    /**
     * @param {DynamicMarkerImageController~settings} settings
     */
    constructor(settings) {
        settings = settings || {};
        settings.attribute = settings.attribute || 'data-marker';

        this.settings = settings;
    }

    /**
     * @param {LocationManager} locationManager
     */
    init(locationManager) {
        locationManager.marker.forEach(marker => {
            let icon = marker.element.getAttribute(this.settings.attribute);
            if (icon) {
                marker.marker.setIcon(icon);
            }
        })
    }

    onMapMove() {}

    onMarkerClick() {}

    preprocess() {}

}

LocationManagerControllerFactory.register('dynamicMarkerImage', DynamicMarkerImageController);