import html from '../../fixture/map.html';
import { LocationManager } from "../../../../Resources/Private/Javascripts/Source/LocationManager";
import { InfoWindowController } from "../../../../Resources/Private/Javascripts/Source/Controller/InfoWindowController";
import { assert } from 'chai';
import sinon from 'sinon';


describe('InfoWindowController', function() {
    /**
     * @type {LocationManager}
     */
    var locationManager;

    /**
     * @type {InfoWindowController}
     */
    var controller;

    /**
     * A randomly selected marker for each test
     * @type {LocationManager~marker}
     */
    var marker;

    let container;

    beforeEach(function() {
        container = document.createElement('div');
        container.innerHTML = html;
        document.body.appendChild(container);
        locationManager = new LocationManager({
            mapContainer: '#map',
            markerContainer: '#list',
            markerElements: 'li.location',
            longAttribute: 'data-longitude',
            latAttribute: 'data-latitude',
            fixedAttribute: 'data-fixed',
            mapOptions: { zoom: 5 },
            clusterer: {
                styles: [{
                    url: '/base/Tests/Frontend/files/Clusterer.png',
                    width: 53,
                    height: 52,
                    textColor: '#000'
                }]
            }
        });


        controller = new InfoWindowController({
            selector: '.js-infoWindow'
        });
        locationManager.addController(controller);

        var index = Math.floor(Math.random() * locationManager.marker.length);
        marker = locationManager.marker[index];
    });

    afterEach(() => {
        if (container) {
            container.innerHTML = '';
            container.remove();
            container = null;
        }
    })

    it ('should open an infowindow on the given marker', function() {
        sinon.spy(controller.infoWindow, 'open');

        controller.onMarkerClick(marker);

        assert.isTrue(controller.infoWindow.open.calledWith(locationManager.map, marker.marker));
    });

    it ('should display the correct content in the infoWindow', function() {
        var content = marker.element.querySelector('.js-infoWindow').innerHTML;

        controller.onMarkerClick(marker);
        assert.include(controller.infoWindow.getContent(), content);
    });

    it ('should zoom in to zoomlevel 10', function() {
        sinon.spy(locationManager.map, 'setZoom');

        controller.onMarkerClick(marker);

        assert.isTrue(locationManager.map.setZoom.calledWith(10));
    });

    it ('should not zoom out', function() {
        locationManager.map.setZoom(11);
        sinon.spy(locationManager.map, 'setZoom');

        controller.onMarkerClick(marker);

        assert.isFalse(locationManager.map.setZoom.called);
    });

    it ('should remove markers from the clusterer', function() {
        sinon.spy(locationManager._markerClusterer, 'removeMarker');
        controller.onMarkerClick(marker);
        assert.isTrue(locationManager._markerClusterer.removeMarker.calledWith(marker.marker));
    });

    it ('should add markers back to the clusterer', function() {
        controller.onMarkerClick(marker);
        sinon.spy(locationManager._markerClusterer, 'addMarker');
        controller.addCurrentMarkerToClusterer();
        assert.isTrue(locationManager._markerClusterer.addMarker.calledWith(marker.marker));
    })

});