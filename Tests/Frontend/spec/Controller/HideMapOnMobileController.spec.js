import html from '../../fixture/map.html';
import { HideMapOnMobileController } from '../../../../Resources/Private/Javascripts/Source/Controller/HideMapOnMobileController';
import { assert } from 'chai';
import sinon from 'sinon';


describe('HideMapOnMobileController', function() {

    /**
     * @type {HideMapOnMobileController}
     */
    var controller;

    /**
     * @type {HTMLElement}
     */
    var map;

    let container;

    beforeEach(function() {
        container = document.createElement('div');
        container.innerHTML = html;
        document.body.appendChild(container);

        controller = new HideMapOnMobileController({
            threshold: 768,
            mapContainer: '#map'
        });
        map = document.querySelector('#map');
    });

    afterEach(() => {
        if (container) {
            container.innerHTML = '';
            container.remove();
            container = null;
        }
    });

    it ('should hide the map by moving it to the left', function() {
        var offset = map.getBoundingClientRect().left;
        assert.isAtLeast(offset, -1000);

        controller.hideMap();

        offset = map.getBoundingClientRect().left;
        assert.isAtMost(offset, -1500);
    });

    it ('should show the map by removing the offset', function() {
        // offset is default
        var offset = map.getBoundingClientRect().left;

        // offset is > 9000
        controller.hideMap();

        // offset should be back to default
        controller.showMap();
        assert.equal(offset, map.getBoundingClientRect().left);
    });

    it ('should detect whether or not the map is currently being shown', function() {
        controller.hideMap();
        assert.isFalse(controller.isMapShown());
        controller.showMap();
        assert.isTrue(controller.isMapShown());
    });

    it ('should call the hide function, if the window size is to small', function() {
        controller.showMap();
        sinon.spy(controller, 'hideMap');

        controller.onWindowResize(1);
        assert.isTrue(controller.hideMap.called);

        controller.hideMap.restore();
    });

    it ('should call the show function, if the window size is to large', function () {
        controller.hideMap();
        sinon.spy(controller, 'showMap');

        controller.onWindowResize(1000);
        assert.isTrue(controller.showMap.called);

        controller.showMap.restore();
    });

    it ('should hide the map if the page initially is smaller than the threshold', function() {
        controller = new HideMapOnMobileController({
            threshold: 5000,
            mapContainer: '#map'
        });
        controller.init(null);
        assert.isFalse(controller.isMapShown());
    });
});