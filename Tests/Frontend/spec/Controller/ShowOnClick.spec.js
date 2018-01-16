import html from '../../fixture/map.html';
import { assert } from 'chai';
import { ShowOnClickController } from '../../../../Resources/Private/Javascripts/Source/Controller/ShowOnClickController';
import { LocationManager } from '../../../../Resources/Private/Javascripts/Source/LocationManager';
import $ from 'jquery';
import sinon from 'sinon';

describe('ShowOnClick', function() {
    /**
     * @type {LocationManager}
     */
    var locationManager;

    /**
     * @type {ShowOnClickController}
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

        controller = new ShowOnClickController({
            linkSelector: '.showOnMap'
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


    it ('should pan to the marker when clicking on the link', function() {
        var index = Math.floor(Math.random() * locationManager.marker.length);
        var marker = locationManager.marker[index];

        sinon.spy(locationManager.map, 'setCenter');
        controller.onShowLinkClick(marker, locationManager);

        var latlng = locationManager.map.setCenter.args[0][0];
        var markerLatLng = marker.marker.getPosition();

        assert.equal(latlng.lat(), markerLatLng.lat());
        assert.equal(latlng.lng(), markerLatLng.lng());

        locationManager.map.setCenter.restore();
    });

    it ('should scroll the map into view', function() {
        $('body').scrollTop(4000);
        controller.onShowLinkClick(locationManager.marker[0], locationManager);
        assert.isAtMost($('body').scrollTop(), 300);
    });
});