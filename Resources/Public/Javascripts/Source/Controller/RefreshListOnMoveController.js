/**
 * @typedef {Object} RefreshListOnMoveController~settings
 * @property {number} [throttle = 250] - The amount of throttling to apply
 */

/**
 * Hides locations in the list that are not inside of the current map bounds
 *
 * @implements {LocationManagerControllerInterface}
 */

class RefreshListOnMoveController {

    /**
     * @param {RefreshListOnMoveController~settings} settings
     */
    constructor(settings) {
        settings = settings || {};
        settings.throttle = settings.throttle || 250;

        this._hideInListDebounced = EventHelpers.throttle(this.hideInList, settings.throttle, this);
    }

    /**
     * @param {LocationManager} locationManager
     */
    init(locationManager) {
        this._locationManager = locationManager;
    }

    onMarkerClick() {}

    preprocess() {}

    onMapMove() {
        this._hideInListDebounced();
    }

    /**
     * @type {LocationManager}
     */
    _locationManager;

    /**
     * Throttled version of {@link RefreshListOnMoveController#hideInList}
     * @type {Function}
     * @private
     */
    _hideInListDebounced;

    /**
     * Hides the elements in the list that are outside of the bounds
     */
    hideInList() {
        const bounds = this._locationManager.map.getBounds();
        this._locationManager.marker.forEach(marker => {
            marker.showInList = marker.showOnMap && bounds.contains(marker.marker.getPosition());
        });
        this._locationManager.updateList();
    }


}

LocationManagerControllerFactory.register('refreshListOnMove', RefreshListOnMoveController);