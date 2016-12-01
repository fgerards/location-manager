/**
 * @typedef {Object} HideMapOnMobileController~settings
 * @property {number} [threshold = 768]
 * @property {number} [throttle = 300]
 * @property {string} [mapContainer]
 */

/**
 * Hides the map on mobile devices.
 * Note: In order to preserve functionality on mobile devices, the map is note actually hidden,
 *       moved outside of the viewport
 *
 * @implements LocationManagerControllerInterface
 */

class HideMapOnMobileController {

    /**
     * @type {HideMapOnMobileController~settings}
     */
    settings;

    /**
     * @type {JQuery}
     */
    $mapContainer;

    /**
     * @type {Function}
     */
    _onWindowResizeThrottled;

    /**
     * @param {HideMapOnMobileController~settings} settings
     */
    constructor(settings) {
        settings = settings || {};
        settings.threshold = settings.threshold || 768;
        settings.throttle = settings.throttle || 300;

        if (typeof settings.mapContainer === 'string') {
            this.$mapContainer = $(settings.mapContainer)
        }

        this.settings = settings;

        if (settings.throttle) {
            this._onWindowResizeThrottled = EventHelpers.throttle(this.onWindowResize, settings.throttle, this);
        } else {
            this._onWindowResizeThrottled = this.onWindowResize;
        }
    }

    /**
     * @param {LocationManager} locationManager
     */
    init(locationManager) {
        if (!this.$mapContainer) {
            this.$mapContainer = $(locationManager._settings.mapContainer);
        }

        window.addEventListener('resize', this._onWindowResizeThrottled.bind(this, null));
        this.onWindowResize();
    }

    /**
     * Method that is being called, every time the window is being resized.
     * The windowWidth parameter was added to improve testability
     *
     * @param {number} [windowWidth] - current width of the window. Defaults to window.innerWidth
     */
    onWindowResize(windowWidth) {
        windowWidth = windowWidth || window.innerWidth;

        if (windowWidth < this.settings.threshold) {
            // mobile
                this.hideMap();
        } else {
            // desktop
                this.showMap();
        }
    }

    showMap() {
        this.$mapContainer.css({
            position: '',
            left: ''
        });
    }

    hideMap() {
        this.$mapContainer.css({
            position: 'absolute',
            left: '9999px'
        });
    }

    /**
     * Checks whether or not the map is currently being displayed.
     * @return {boolean}
     */
    isMapShown() {
        return this.$mapContainer.offset().left < 9000;
    }

    onMapMove() {}

    onMarkerClick() {}

    preprocess() {}

}

LocationManagerControllerFactory.register('hideMapOnMobile', HideMapOnMobileController);