class LocationManagerControllerFactory {

    /**
     * Map of all of the constructors for the factory
     *
     * @type {{}}
     * @private
     */
    static _constructors = {};

    /**
     * Registers a new Constructor with the factory
     *
     * @param name
     * @param Constructor
     */
    static register(name, Constructor) {
        LocationManagerControllerFactory._constructors[name] = Constructor;
    }

    /**
     * Creates a new instance of the Controller with the supplied name.
     * Returns null if no controller exists
     *
     * @param name
     * @param settings
     * @return {LocationManagerControllerInterface}
     */
    static make(name, settings) {
        if (LocationManagerControllerFactory._constructors[name]) {
            return new LocationManagerControllerFactory._constructors[name](settings);
        }
        return null;
    }

}