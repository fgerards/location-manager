/**
 * @typedef {Object} AutocompletedSearchController~settings
 * @property {string} [field = '.tx-locationmanager-search-field']
 * @property {google.maps.places.AutocompleteOptions} [autocompleteOptions]
 * @property {number} [expand = 0] - The amount to expand the search bounds by
 */

/**
 * Handles the search using google maps Autocomplete
 *
 * @implements LocationManagerControllerInterface
 */

class AutocompletedSearchController {

    /**
     * @type {AutocompletedSearchController~settings}
     */
    settings;

    /**
     * @type {google.maps.Geocoder}
     */
    geocoder;

    /**
     * @type {LocationManager}
     */
    locationManager;

    /**
     * @type {MapsHelper}
     */
    mapsHelper = new MapsHelper();

    /**
     * @param {AutocompletedSearchController~settings} settings
     */
    constructor(settings) {
        settings = settings || {};
        settings.field = settings.field || '.location-manager__button';
        settings.autocompleteOptions = settings.autocompleteOptions || { types: ['(regions)'] };

        this.settings = settings;
    }

    /**
     * @param {LocationManager} locationManager
     */
    init(locationManager) {
        this.locationManager = locationManager;
        this.geocoder = new google.maps.Geocoder();

        let autocomplete = new google.maps.places.Autocomplete(document.querySelector(this.settings.field), this.settings.autocompleteOptions);
        autocomplete.addListener('place_changed', () => {
            this.query(autocomplete.getPlace());
        });

        // find form
        let node = document.querySelector(this.settings.field);
        let form;
        do {
            if (node.nodeName === 'FORM') {
                form = node;
                break;
            }
        } while (node = node.parentNode);

        if (form) {
            form.addEventListener('submit', e => {
                e.preventDefault();
                this.query(autocomplete.getPlace());
            });
        }

        // TODO remove
        window.map = this.locationManager.map;
    }

    /**
     * Performs a query using the passed place. If no place was passed then the geocoder is used in
     * order to find the closest match. Calls {@link goToBounds} once results are ready
     *
     * @param {google.maps.places.PlaceResult} place
     */
    query(place) {
        if (place && place.geometry && place.geometry.viewport) {
            this.goToBounds(place.geometry.viewport);
            return;
        }

        this.geocoder.geocode({
            address: document.querySelector(this.settings.field).value,
        }, (results, status) => {
            /** @type {google.maps.GeocoderResult[]} results **/

            if (status !== google.maps.GeocoderStatus.OK) {
                throw new Error('Google Maps Geocoder error ' + status + ' - ' + JSON.stringify(results));
            }

            this.goToBounds(results[0].geometry.bounds);
        })
    }

    /**
     * Moves the bounds to the given bounds
     * @param {google.maps.LatLngBounds} bounds
     */
    goToBounds(bounds) {
        if (this.settings.expand) {
            bounds = this.mapsHelper.expandLatLngBounds(bounds, this.settings.expand);
        }
        this.locationManager.map.fitBounds(bounds);
        this.locationManager._settings.mapContainer.scrollIntoView(true);
    }

    onMarkerClick() {}

    onMapMove() {}

    preprocess() {}


}

LocationManagerControllerFactory.register('autocompletedSearch', AutocompletedSearchController);