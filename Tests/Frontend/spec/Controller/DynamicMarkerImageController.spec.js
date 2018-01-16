
import '../../../../Resources/Private/Javascripts/Source/LocationManager';
import { DynamicMarkerImageController } from '../../../../Resources/Private/Javascripts/Source/Controller/DynamicMarkerImageController';
import { LocationManagerControllerFactory } from '../../../../Resources/Private/Javascripts/Source/LocationManagerControllerFactory';
import { assert } from 'chai';


describe('DynamicMarkerImageController', function() {

    var subject;

    beforeEach(function() {
        subject = new DynamicMarkerImageController({ attribute: 'data-test' });
    });

    it('should register itself with LocationManagerControllerFacotry as "dynamicMarkerImage"', function() {
        var constructor = LocationManagerControllerFactory._constructors.dynamicMarkerImage;
        assert.equal(constructor, DynamicMarkerImageController);
    });

    it('should set the marker icon dependent on settings.attribute', function() {
        var markerWithIcon = {
            element: (function() {
                var e = document.createElement('div');
                e.setAttribute('data-test', 'test.png');
                return e;
            })(),
            marker: new google.maps.Marker()
        };
        var markerWithoutIcon = {
            element: document.createElement('div'),
            marker: new google.maps.Marker()
        };

        var locationManagerStub = {
            marker: [markerWithIcon, markerWithoutIcon]
        };

        subject.init(locationManagerStub);

        assert.equal(markerWithIcon.marker.getIcon(), 'test.png');
        assert.isUndefined(markerWithoutIcon.marker.getIcon());
    });

    it('should default to data-marker', function() {
        var s = new DynamicMarkerImageController();
        assert.equal(s.settings.attribute, 'data-marker');
    });

});