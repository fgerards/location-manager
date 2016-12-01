describe('RefreshListOnMoveController', function() {

    /**
     * @type {LocationManager}
     */
    var locationManager;

    /**
     * @type {RefreshListOnMoveController}
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

        controller = new RefreshListOnMoveController({
            throttle: 0
        });
        locationManager.addController(controller);
    });

    it ('should show all markers, if they are visible', function(done) {
        // zoom all the way out to show all of the markers
        locationManager.map.setZoom(1);

        setTimeout(function() {
            controller.hideInList();
            locationManager.marker.forEach(function(marker) {
                assert.isTrue(marker.showInList);
            });
            done();
        }, 1500);

    });

    it ('should hide all markers in the list, if they are not visible', function(done) {
        // zoom to pole
        locationManager.map.setCenter(new google.maps.LatLng(1,1));
        locationManager.map.setZoom(12);

        setTimeout(function() {
            controller.hideInList();
            locationManager.marker.forEach(function(marker) {
                assert.isFalse(marker.showInList);
            });
            done();
        }, 1500)
    });

    it ('should call updateList', function(done) {
        sinon.spy(locationManager, 'updateList');

        setTimeout(function() {
            controller.hideInList();
            assert.isTrue(locationManager.updateList.called);
            locationManager.updateList.restore();
            done();
        }, 1500);

    });

});