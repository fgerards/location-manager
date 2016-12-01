describe('ClickToEnable', function() {
    /**
     * @type {LocationManager}
     */
    var locationManager;

    /**
     * @type {ClickToEnableController}
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

        controller = new ClickToEnableController({
            enabled: '#clickToEnable-enabled',
            disabled: '#clickToEnable-disabled'
        });
        locationManager.addController(controller);
    });

    it ('should select the string passed', function() {
        var controller = new ClickToEnableController({
            enabled: 'body',
            disabled: 'body'
        });

        assert.notTypeOf(controller.settings.enabled, 'string');
        assert.notTypeOf(controller.settings.disabled, 'string');
    });

    it ('should not select passed DOMNodes', function() {
        var node = document.createElement('div');
        var controller = new ClickToEnableController({ enabled: node, disabled: node });

        assert.equal(controller.settings.enabled, node);
        assert.equal(controller.settings.disabled, node);
    });

    it ('should enable the map', function(done) {
        // cheap locationManager stub
        var locm = {
            map: {
                setOptions: function(options) {
                    assert.equal(options.draggable, true);
                    done();
                }
            }
        };
        controller.enableDragging(true, locm);
    });

    it ('should disable the map', function(done) {
        // cheap location maanger stub
        var locm = {
            map: {
                setOptions: function(options) {
                    assert.equal(options.draggable, false);
                    done();
                }
            }
        };
        controller.enableDragging(false, locm);
    });

    it ('should enable dragging when clicking on the map', function() {
        sinon.spy(controller, 'enableDragging');
        $('#map').trigger('click');
        controller.enableDragging.calledWith(true, locationManager);
        controller.enableDragging.restore();
    });

    it ('should disable dragging when hovering over the enabled element', function() {
        sinon.spy(controller, 'enableDragging');
        $('#clickToEnable-enabled').trigger('hover');
        controller.enableDragging.calledWith(false, locationManager);
        controller.enableDragging.restore();
    });

    it ('should hide the enabled item when disabling', function() {
        controller.enableDragging(false, locationManager);
        assert.equal($('#clickToEnable-enabled').css('display'), 'none')
    });

    it ('should hide the disabled item when enabling', function() {
        controller.enableDragging(true, locationManager);
        assert.equal($('#clickToEnable-disabled').css('display'), 'none')
    });

    // TODO continue writing tests

});