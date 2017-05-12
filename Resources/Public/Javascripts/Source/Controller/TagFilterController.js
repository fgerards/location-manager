/**
 * @typedef {Object} TagFilterController~settings
 * @property {string} [items = '.tx-locationmanager-tag']
 * @property {string} [reset = '.tx-locationmanager-tag-reset'] - The reset button
 * @property {string} [activeClass = 'active'] - Class to set on a tag item when it is active
 * @property {string|Node} [container = null] - Container of the tags. If this attribute is set, then this container will be hidden
 *                                         if all tags are invisible
 * @property {string} [attribute = 'data-tags']
 * @property {number} [throttle = 500]
 * @property {string} [combine] - pass 'AND' or 'OR'. defaults to 'none'
 */

/**
 * @typedef {Object} TagFilterController~tag
 * @property {HTMLElement} element
 * @property {string} name
 * @property {string} id
 */

/**
 * @typedef {LocationManager~marker} TagFilterController~marker
 * @property {string[]} _tags
 */


/**
 * Handles the tag filter.
 * Because of the nature of this controller, it should be included as one of the first Controllers
 *
 * @implements LocationManagerControllerInterface
 */

class TagFilterController {


    /**
     * @type {TagFilterController~settings}
     */
    settings;

    /**
     * @type {TagFilterController~tag[]};
     */
    tags = [];

    /**
     * @type {LocationManager}
     */
    locationManager;

    /**
     * List of tags that are currently active
     * @type {TagFilterController~tag[]}
     */
    activeTags = [];


    /**
     * @param {TagFilterController~settings} settings
     */
    constructor(settings) {
        settings = settings || {};
        settings.items = settings.items || '.location-manager__tag_regular';
        settings.reset = settings.reset || '.location-manager__tag_reset';
        settings.attribute = settings.attribute || 'data-tags';
        settings.activeClass = settings.activeClass || 'location-manager__tag_active';
        settings.throttle = settings.throttle || 500;
        settings.container = document.querySelector(settings.container);
        settings.combine = settings.combine || 'none';

        this.settings = settings;

        this._hideTagsInListThrottled = EventHelpers.throttle(this.updateTagsInList, this.settings.throttle, this);
    }

    /**
     * @param {LocationManager} locationManager
     */
    init(locationManager) {
        this.locationManager = locationManager;

        const tags = document.querySelectorAll(this.settings.items);
        for (let i = 0; i < tags.length; i++) {
            let tag = {
                element: tags[i],
                id: tags[i].getAttribute(this.settings.attribute),
                name: tags[i].innerText
            };
            this.tags.push(tag);
            tag.element.addEventListener('click', this.onTagClick.bind(this, tag));
        }

        this.locationManager.marker.forEach(marker => {
            marker._tags = marker.element.getAttribute(this.settings.attribute).split(',');
            // prevent empty string
            if (!marker._tags[0]) { marker._tags = []; }
        });

        let reset = document.querySelector(this.settings.reset);
        if (reset) {
            reset.addEventListener('click', this.resetFilter.bind(this));
        } else {
            console.warn('TagFilterController: No reset button found');
        }

        // initially execute updateTagsinlist
        this.updateTagsInList();
    }


    /**
     * Executed, whenever the mouse is being moved
     */
    onMapMove() {
        this._hideTagsInListThrottled();
    }

    /**
     * Removes all active classes from the tag elements
     */
    removeActiveClasses() {
        this.tags.forEach(tag => {
            tag.element.classList.remove(this.settings.activeClass);
        })
    }

    /**
     * Adds the active class for the given filter depending on the combination method
     * @param {TagFilterController~tag} tag
     */
    addActiveClass(tag) {
        switch (this.settings.combine) {
            case 'AND':
            case 'OR':
                // AND & OR: pile on
                tag.element.classList.add(this.settings.activeClass);
                break;
            case 'none':
            default:
                // default: only one active
                this.removeActiveClasses();
                tag.element.classList.add(this.settings.activeClass);
                break;
        }
    }

    /**
     * Resets the filter to it's default state (no filter)
     */
    resetFilter() {
        this.activeTags = [];
        this.removeActiveClasses();
        this.locationManager.marker.forEach(marker => {
            marker.showInList = true;
            marker.showOnMap = true;
        });
        this.locationManager.updateList();
        this.locationManager.updateMap();
    }

    /**
     * @param {TagFilterController~tag} tag
     */
    onTagClick(tag) {
        if (this.activeTags.indexOf(tag) > -1) {
            // remove the tag, if it is already active
            this._removeTag(tag);
            return;
        }
        this.addActiveClass(tag);
        this.locationManager.marker.forEach(marker => {
            this._changeMarkerState(marker, (marker._tags.indexOf(tag.id) !== -1))
        });

        if (this.settings.combine === 'none') {
            this.activeTags = [ tag ];
        } else {
            this.activeTags.push(tag);
        }

        // reapply map filtering by RefreshListOnMoveController
        const refreshListOnMove = this.locationManager.getController(RefreshListOnMoveController);
        if (refreshListOnMove) { refreshListOnMove.hideInList(); }

        this.locationManager.updateMap();
        this.locationManager.updateList();
    }

    /**
     * Updates the taglist that is currently displayed to the user:
     * Only shows the tags that currently have items inside of the bounds of the map
     */
    updateTagsInList() {
        const bounds = this.locationManager.map.getBounds();
        let visibleTags = [];

        this.locationManager.marker.forEach(marker => {
            if (!bounds.contains(marker.marker.getPosition())) {
                return;
            }
            marker._tags.forEach(tag => {
                if (visibleTags.indexOf(tag) === -1) {
                    visibleTags.push(tag);
                }
            });
        });

        let areTagsDisplayed = false;
        this.tags.forEach(tag => {
            if (visibleTags.indexOf(tag.id) !== -1) {
                areTagsDisplayed = true;
                tag.element.style.removeProperty('display');
            } else {
                tag.element.style.display = 'none';
            }
        });

        if (this.settings.container) {
            if (areTagsDisplayed) {
                this.settings.container.style.removeProperty('display');
            } else {
                this.settings.container.style.display = 'none';
            }
        }
    }

    _removeTag(tag) {
        this.activeTags.splice(this.activeTags.indexOf(tag), 1);
        const tags = this.activeTags;
        this.resetFilter();
        tags.forEach(tag => {
            this.onTagClick(tag);
        });
    }

    /**
     * Changes the marker display state depending on the combination method that was
     * passed in the settings ("AND", "OR", 'none')
     * @param {LocationManager~marker} marker
     * @param {boolean} state
     * @private
     */
    _changeMarkerState(marker, state) {
        // if this is the first filter that is being applied, then simply apply it without additional logic
        if (this.activeTags.length === 0) {
            marker.showOnMap = marker.showInList = state;
            return;
        }

        switch (this.settings.combine) {
            case 'AND':
                marker.showOnMap = marker.showOnMap && state;
                marker.showInList= marker.showInList&& state;
                break;
            case 'OR':
                marker.showOnMap = marker.showOnMap || state;
                marker.showInList= marker.showInList|| state;
                break;
            case 'none':
            default:
                marker.showOnMap = marker.showInList = state;
                break;
        }
    }

    onMarkerClick() {}

    preprocess() {}


    /**
     * @type {Function}
     */
    _hideTagsInListThrottled;
}

LocationManagerControllerFactory.register('tagFilter', TagFilterController);