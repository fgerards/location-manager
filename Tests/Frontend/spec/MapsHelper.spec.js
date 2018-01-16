import { MapsHelper } from "../../../Resources/Private/Javascripts/Source/MapsHelper";
import { assert } from 'chai';

describe ('MapsHelper', function() {

    /**
     * @type {MapsHelper}
     */
    var mapsHelper;

    function fuzzyNumberEquals(subject, equalTo, variance) {
        variance = variance || .5;
        var lower = equalTo - variance;
        var upper = equalTo + variance;
        return subject >= lower && subject <= upper;
    }

    beforeEach(function() {
        mapsHelper = new MapsHelper();
    });

    describe('degToRad', function() {
        it ('should convert degrees to radians', function() {
            assert.equal(mapsHelper.degToRad(90), .5 * Math.PI);
            assert.equal(mapsHelper.degToRad(180), Math.PI);
            assert.equal(mapsHelper.degToRad(360), 2 * Math.PI);
        })
    });

    describe('latLngKilometerOffset', function() {

        var freiburg;

        beforeEach(function() {
            freiburg = new google.maps.LatLng({ lat: 47.999008, lng:  7.842104 });
        });

        it ('should move points in latitude direction', function() {
            var latMovedPoint = mapsHelper.latLngKilometerOffset(freiburg, { lat: 5, lng: 0 });
            var distance = google.maps.geometry.spherical.computeDistanceBetween(freiburg, latMovedPoint);
            assert.isTrue(fuzzyNumberEquals(distance, 5000, 100));
        });

        it ('should move points in longitude direction', function() {
            var lngMovedPoint = mapsHelper.latLngKilometerOffset(freiburg, { lat: 0, lng: 5 });

            var distance = google.maps.geometry.spherical.computeDistanceBetween(freiburg, lngMovedPoint);
            assert.isTrue(fuzzyNumberEquals(distance, 5000, 100));
        });

        it ('should move points in latitude and longitude direction at the same time', function() {
            var latLngMovedPoint = mapsHelper.latLngKilometerOffset(freiburg, { lat: 5, lng: 5 });

            var distance = google.maps.geometry.spherical.computeDistanceBetween(freiburg, latLngMovedPoint);
            assert.isTrue(fuzzyNumberEquals(distance, Math.sqrt(Math.pow(5000,2) + Math.pow(5000,2)), 100));
        });
    });

    describe('expandLatLngBounds', function() {

        it ('should expand LatLngBounds equally to all sides', function() {
            var freiburg = new google.maps.LatLng({ lat: 47.999008, lng:  7.842104 });
            var latLngMovedPoint = mapsHelper.latLngKilometerOffset(freiburg, { lat: 5, lng: 5 });

            var bounds = new google.maps.LatLngBounds(freiburg, latLngMovedPoint);
            var expanded = mapsHelper.expandLatLngBounds(bounds, 7);

            var distanceNe = google.maps.geometry.spherical.computeDistanceBetween(bounds.getNorthEast(), expanded.getNorthEast());
            var distanceSw = google.maps.geometry.spherical.computeDistanceBetween(bounds.getSouthWest(), expanded.getSouthWest());
            var distanceShould = Math.sqrt(Math.pow(7000, 2) + Math.pow(7000, 2));

            assert.isTrue(fuzzyNumberEquals(distanceNe, distanceShould, 100));
            assert.isTrue(fuzzyNumberEquals(distanceSw, distanceShould, 100));
        });
    })

});