import { LocationManagerControllerFactory } from "../../../Resources/Private/Javascripts/Source/LocationManagerControllerFactory";
import { assert } from 'chai';
import sinon from 'sinon'

describe('LocationmanagerControllerFactory', function() {

    it ('should add constructors', function() {
        function Constructor() {};
        var key = Math.random().toString(36).substr(2,10);

        LocationManagerControllerFactory.register(key, Constructor);
        assert.equal(LocationManagerControllerFactory._constructors[key], Constructor);
    });

    it ('should initiate Controllers with the given settings', function() {
        var settings = { a: 'test' };
        var key = Math.random().toString(36).substr(2,10);

        this.MyConstructor = function(mySettings) {};
        sinon.spy(this, 'MyConstructor');

        LocationManagerControllerFactory.register(key, this.MyConstructor);
        var instance = LocationManagerControllerFactory.make(key, settings);

        assert.isTrue(this.MyConstructor.calledWith(settings));
        assert.isTrue(instance instanceof this.MyConstructor)
    });

    it ('should return null if Controller is not defined', function() {
        var key = Math.random().toString(36).substr(2,11);
        var instance = LocationManagerControllerFactory.make(key);
        assert.isNull(instance)
    })

});