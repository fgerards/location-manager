import html from '../../fixture/map.html'
import { assert } from 'chai'
import { RefreshListOnMoveController } from "../../../../Resources/Private/Javascripts/Source/Controller/RefreshListOnMoveController";
import { LocationManager } from "../../../../Resources/Private/Javascripts/Source/LocationManager";
import sinon from 'sinon';

describe('RefreshListOnMoveController', function() {

    /**
     * @type {LocationManager}
     */
    var locationManager;

    /**
     * @type {RefreshListOnMoveController}
     */
    var controller;

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

    afterEach(() => {
        if (container) {
            container.innerHTML = '';
            container.remove();
            container = null;
        }
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

    }).timeout(5000);

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