/**
 * @typedef {Object} ClickToEnableController~settings
 * @property {string|Node} [enabled = '.tx-locationmanager-moveToggle-enabled'] - The field that should be shown when enabled
 * @property {string|Node} [disabled = '.tx-locationmanager-moveToggle-disabled'] - The field that should be shown when disabled
 */

/**
 * Enables moving the map after clicking inside, disables it after hovering over the element
 *
 * @implements LocationManagerControllerInterface
 */

class ClickToEnableController {

    /**
     * @type {ClickToEnableController~settings}
     */
    settings;

    /**
     * @param {ClickToEnableController~settings} settings
     */
    constructor(settings) {
        settings = settings || {};
        settings.enabled = settings.enabled || '.location-manager__toggle_enabled';
        settings.disabled = settings.disabled || '.location-manager__toggle_disabled';

        if (typeof settings.enabled === 'string') { settings.enabled = document.querySelector(settings.enabled); }
        if (typeof settings.disabled === 'string') { settings.disabled = document.querySelector(settings.disabled); }

        this.settings = settings;
    }

    /**
     * @param {LocationManager} locationManager
     */
    init(locationManager) {
        // enable map
        locationManager.map.addListener('click', this.enableDragging.bind(this, true, locationManager));
        // disable map
        this.settings.enabled.addEventListener('mouseover', this.enableDragging.bind(this, false, locationManager));
        // disable by default
        this.enableDragging(false, locationManager);
    }

    /**
     * Enables or disables dragging on the map and shows the correct element for that state
     *
     * @param {boolean} enable
     * @param {LocationManager} locationManager
     */
    enableDragging(enable, locationManager) {
        locationManager.map.setOptions({
            draggable: enable,
            scrollwheel: enable,
        });

        if (enable) {
            this.settings.enabled.style.removeProperty('display');
            this.settings.disabled.style.display = 'none';
        } else {
            this.settings.enabled.style.display = 'none';
            this.settings.disabled.style.removeProperty('display');
        }
    }

    onMapMove() {}

    onMarkerClick() {}

    preprocess() {}

}

LocationManagerControllerFactory.register('clickToEnable', ClickToEnableController);