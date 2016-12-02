describe('LocationManager', function() {

    /**
     * @type {LocationManager}
     */
    var locationManager;

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
    });

    it ('should initialize a google map', function() {
        var inner = document.querySelector('#map').innerHTML;
        assert.notEqual(inner, '');
    });

    it ('should initialize markers for all elements', function() {
        assert.equal(locationManager.marker.length, 6);
    });

    it ('should use LocationManagerControllerFactory to initialize controllers based on settings passed in controllerFactory', function(done) {
        sinon.spy(LocationManagerControllerFactory, 'make');

        var factoryArgs = { test: 'lalala' };
        new LocationManager({
            markerContainer: '#list',
            markerElements: 'li.location',
            mapContainer: '#map',
            controllerFactory: {
                testFactory: factoryArgs
            },
            clusterer: {
                styles: [{
                    url: '/base/Tests/Frontend/files/Clusterer.png',
                    width: 53,
                    height: 52,
                    textColor: '#000'
                }]
            }
        });


        setTimeout(function() {
            assert.isTrue(LocationManagerControllerFactory.make.calledWith('testFactory', factoryArgs));
            LocationManagerControllerFactory.make.restore();
            done();
        }, 1500);
    });

    it ('should initialize controllers', function(done) {
        var controller = new LocationManagerControllerStub();
        controller.init = function() {
            done();
        };

        locationManager.addController(controller);
    });

    it ('should call onMapMove on controllers', function(done) {
        var controller = new LocationManagerControllerStub();
        locationManager.addController(controller);

        // if done() is not called, mocha will throw an exception
        controller.onMapMove = function() {
            done();
        };

        locationManager.map.setCenter(new google.maps.LatLng(Math.random() * 180 , Math.random() * 180));
    });

    it ('should call onMarkerClick on controllers', function() {
        var controller = new LocationManagerControllerStub();

        locationManager.addController(controller);
        sinon.spy(controller, 'onMarkerClick');

        // select random marker
        var index = Math.floor(Math.random() * locationManager.marker.length);
        var marker = locationManager.marker[index];

        google.maps.event.trigger(marker.marker, 'click');

        assert.isTrue(controller.onMarkerClick.calledWith(marker));
    });

    it ('should mark elements as fixed depending on the fixedAttribute', function() {
        locationManager.marker.forEach(function(m) {
            assert.equal(m.fixed, !!m.element.getAttribute('data-fixed'));
        });
    });

    it ('should update the list of controllers based on showInList', function() {
        // first: hide all
        locationManager.marker.forEach(function(marker) {
            marker.showInList = false;
        });
        locationManager.updateList();

        assert.equal(document.querySelector('#list').innerHTML, '');

        // select a random element to show again
        var index = null;
        var j = 0;
        while (index === null) {
            if (++j > 100) { throw new Error("Aborting because of too many iterations while searching for unfixed element"); }
            var i = Math.floor(Math.random() * locationManager.marker.length);
            if (!locationManager.marker[i].fixed) {
                index = i;
                break;
            }
        }

        locationManager.marker[index].showInList = true;
        locationManager.updateList();

        assert.isTrue(document.querySelector('#list').contains(locationManager.marker[index].element));
    });

    it ('should update the number of shown markers based on showOnMap', function() {
        // first: show all
        locationManager.marker.forEach(function(marker) {
            marker.showOnMap = true;
        });
        locationManager.updateMap();
        assert.equal(locationManager._markerClusterer.getMarkers().length ,6);

        // then: hide all
        locationManager.marker.forEach(function(marker) {
            marker.showOnMap = false;
        });
        locationManager.updateMap();
        assert.equal(locationManager._markerClusterer.getMarkers().length ,0);

        // lastly: show one random marker
        var index = Math.floor(Math.random() * locationManager.marker.length);
        locationManager.marker[index].showOnMap = true;
        locationManager.updateMap();

        assert.equal(locationManager._markerClusterer.getMarkers().length ,1);
        assert.equal(locationManager._markerClusterer.getMarkers()[0], locationManager.marker[index].marker);
    });

    it ('should show fixed markers, even if showInList is false', function() {
        var container = document.querySelector('#fixed');

        assert.isTrue(container.hasChildNodes());
        locationManager.marker.forEach(function(marker) {
            if (marker.fixed) {
                assert.isTrue(container.contains(marker.element));
            }
        });

        // hide all markers
        locationManager.marker.forEach(function(marker) { marker.showInList = false; });
        locationManager.marker.forEach(function(marker) {
            if (marker.fixed) {
                assert.isTrue(container.contains(marker.element));
            }
        });
    });

    it ('should throw an exception, if neither markerContainer nor markerElements are set', function(done) {
        try {
            locationManager._prepareSettings({
                /* markerContainer and markerElements not set */
            })
        } catch (e) {
            done();
        }
    });

});