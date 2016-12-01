describe('AutocompletedSearchController', function() {

    /**
     * @type {LocationManager}
     */
    var locationManager;

    /**
     * @type {AutocompletedSearchController}
     */
    var controller;

    var bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(50,50),
        new google.maps.LatLng(60,60)
    );

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

        controller = new AutocompletedSearchController({
            field: '#search'
        });
        locationManager.addController(controller);
    });


    it ('should initialize a new autocomplete instance', function() {
        sinon.spy(google.maps.places, 'Autocomplete');
        controller.init(locationManager);
        assert.isTrue(google.maps.places.Autocomplete.calledWithNew());
        google.maps.places.Autocomplete.restore();
    });

    it ('should make a new geocoder instance', function() {
        sinon.spy(google.maps, 'Geocoder');
        controller.init(locationManager);
        assert.isTrue(google.maps.Geocoder.calledWithNew());
        google.maps.Geocoder.restore();
    });

    it ('should pan the map to the given bounds', function() {
        sinon.spy(locationManager.map, 'fitBounds');
        controller.goToBounds(bounds);
        assert.isTrue(locationManager.map.fitBounds.calledWith(bounds));
    });

    it ('should scroll the map into view', function() {
        $('body').scrollTop(5000);
        controller.goToBounds(bounds);
        assert.isAtMost($('body').scrollTop(), 300);
    });

    it ('should use Geocoder to query results', function() {
        sinon.spy(controller.geocoder, 'geocode');

        controller.query(null);
        assert.isTrue(controller.geocoder.geocode.called);

        controller.geocoder.geocode.restore();
    });

});