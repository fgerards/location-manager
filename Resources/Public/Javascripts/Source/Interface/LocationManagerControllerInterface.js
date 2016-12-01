/**
 * Interface that is to be implemented by every LocationManager Controller
 * Note: This class it not to be initialized as it only serves as a endpoint for the
 * \@interface tag of JSDoc. It does not contain any information that is necessary for
 * runtime execution.
 *
 * Please only use this class using the \@implements tag, do not extend it
 *
 * @interface LocationManagerControllerInterface
 */

class LocationManagerControllerInterface {

    /**
     * Initializes the Controller: set's up all of the necessary listeners.
     *
     * @param locationManager
     * @returns {void}
     */
    init(locationManager){
        throw new Error('This method is not implemented');
    }

    /**
     * Called whenever the map is moved
     * Note: This method is called often and thus should not contain ressource intensive operations
     *
     * @returns {void}
     */
    onMapMove() {
        throw new Error('This method is not implemented');
    }

    /**
     * This method is called, whenever a marker on the map is being clicked
     *
     * @param {LocationManager~marker} marker
     * @returns {void}
     */
    onMarkerClick(marker) {
        throw new Error('This method is not implemented');
    }

    /**
     * Preprocessor for the markers: This method is called everytime the markers are being retrieved
     * The preprocessing is executed according to the order of the controllers in the
     * {@link LocationManager#_controllers} array of the manager
     * Note: This method is called often and thus should not contain ressource intensive operations
     *
     * @param {LocationManager~marker[]} markers
     * @returns {void}
     */
    preprocess(markers) {
        throw new Error('This method is not implemented');
    }

}