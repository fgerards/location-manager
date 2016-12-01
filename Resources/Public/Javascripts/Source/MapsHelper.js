class MapsHelper {

    /**
     * Helper function that converts degrees into radians
     * @param {number} deg - degrees
     * @returns {number} - radians
     */
    degToRad(deg) {
        return deg * Math.PI / 180;
    }

    /**
     * moves a given point by a given amount of kilometers.
     * We are using a approximation for this, which turns out to be fairly accurate.
     *
     * The returned position is a new instance of LatLngBounds
     *
     * @see http://stackoverflow.com/a/1253545
     * @see https://en.wikipedia.org/wiki/Latitude#Length_of_a_degree_of_latitude
     *
     * @param {google.maps.LatLng} latlng
     * @param {{ lat: number, lng: number }} offset
     * @returns {google.maps.LatLng}
     */
    latLngKilometerOffset(latlng, offset) {
        let lat = latlng.lat() + offset.lat / 110.574;
        let lng = latlng.lng() + offset.lng / (111.320 * Math.cos(this.degToRad(latlng.lat())));

        if (lat > 80) { lat = 80; } else if (lat < -80) { lat = -80; }
        if (lng > 180) { lng = 180; } else if (lng < -180) { lng = -180; }

        return new google.maps.LatLng(lat, lng);
    }

    /**
     * Takes a given latLng bounds and expands it by the given amount into all directions
     *
     * @param {google.maps.LatLngBounds} bounds
     * @param {number} kilometers
     * @returns {google.maps.LatLngBounds}
     */
    expandLatLngBounds(bounds, kilometers) {
        // the length of the sides of a right-angled triangle with 45deg angles.
        var distance = kilometers;

        var ne = bounds.getNorthEast();
        var sw = bounds.getSouthWest();

        ne = this.latLngKilometerOffset(ne, {lat: distance, lng: distance});
        sw = this.latLngKilometerOffset(sw, {lat: -distance, lng: -distance});

        return new google.maps.LatLngBounds(sw, ne);
    }

}