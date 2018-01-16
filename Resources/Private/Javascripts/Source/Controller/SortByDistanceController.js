/**
 * @typedef {Object} SortByDistanceController~settings
 * @property {number} [throttle = 500]
 */

import { throttle } from '../EventHelpers';

/**
 * Zooms to a marker whenever the showlink is being clicked
 *
 * @implements LocationManagerControllerInterface
 */

export class SortByDistanceController {

    /**
     * @type {SortByDistanceController~settings}
     */
    settings;

    /**
     * @type {LocationManager}
     */
    locationManager;

    /**
     * @param {SortByDistanceController~settings} settings
     */
    constructor(settings) {
        settings = settings || {};
        settings.throttle = settings.throttle || 500;

        this._sortMarkersThrottled = throttle(() => this.sortMarkers, settings.throttle);
        this.settings = settings;
    }

    init(locationManager) {
        this.locationManager = locationManager;
    }

    /**
     * Returns the distance between 2 latlngbounds
     * @param {google.maps.LatLng} a
     * @param {google.maps.LatLng} b
     * @return {number}
     */
    getDistance(a,b) {
        return google.maps.geometry.spherical.computeDistanceBetween(a,b);
    }

    sortMarkers() {
        const center = this.locationManager.map.getCenter();
        this.locationManager.marker.sort((a,b) => {
            return this.getDistance(center, a.marker.getPosition()) - this.getDistance(center, b.marker.getPosition());
        });
    }

    onMapMove() {
        this._sortMarkersThrottled();
    }

    onMarkerClick() {}

    preprocess() {}

    /**
     * @type {Function}
     */
    _sortMarkersThrottled;

}