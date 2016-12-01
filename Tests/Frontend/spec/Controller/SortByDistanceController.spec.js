describe('SortByDistanceController', function() {

    /**
     * @type {LocationManager}
     */
    var locationManager;

    /**
     * @type {SortByDistanceController}
     */
    var controller;

    before(function() {
        fixture.setBase('Tests/Frontend/fixture');
    });

    beforeEach(function() {
        fixture.load('map.html');
        locationManager = new LocationManager({
            mapContainer: '#map',
            markerContainer: '#list',
            markerElements: 'li.location',
            longAttribute: 'data-longitude',
            latAttribute: 'data-latitude',
            fixedAttribute: 'data-fixed',
            clusterer: {
                styles: [{
                    url: '/base/Tests/Frontend/files/Clusterer.png',
                    width: 53,
                    height: 52,
                    textColor: '#000'
                }]
            }
        });

        controller = new SortByDistanceController({
            throttle: 0
        });
        locationManager.addController(controller);
    });


    it ('should calculate distances', function() {
        var ottawa = new google.maps.LatLng(45.421530, -75.697193);
        var freiburg = new google.maps.LatLng(47.999008, 7.842104);
        // actually 6066.02km, but we grant some variance by rounding to the
        // closest kilometer
        var actualDistance = 6055;
        var calculatedDistance = controller.getDistance(ottawa, freiburg) / 1000;

        assert.equal(Math.round(calculatedDistance), actualDistance);
    });

    it ('should sort the markers by their distance to the center of the map', function() {
        var lastDistance = 0;
        var center = locationManager.map.getCenter();

        controller.sortMarkers();

        locationManager.marker.forEach(function (marker) {
            var distance = controller.getDistance(marker.marker.getPosition(), center);
            assert.isAtMost(lastDistance, distance);
            lastDistance = distance;
        })
    });

});