'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @externs_url http://closure-compiler.googlecode.com/svn/trunk/contrib/externs/maps/google_maps_api_v3_3.js
// ==/ClosureCompiler==

/**
 * @name MarkerClusterer for Google Maps v3
 * @version version 1.0
 * @author Luke Mahe
 * @fileoverview
 * The library creates and manages per-zoom-level clusters for large amounts of
 * markers.
 * <br/>
 * This is a v3 implementation of the
 * <a href="http://gmaps-utility-library-dev.googlecode.com/svn/tags/markerclusterer/"
 * >v2 MarkerClusterer</a>.
 */

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A Marker Clusterer that clusters markers.
 *
 * @param {google.maps.Map} map The Google map to attach to.
 * @param {Array.<google.maps.Marker>=} opt_markers Optional markers to add to
 *   the cluster.
 * @param {Object=} opt_options support the following options:
 *     'gridSize': (number) The grid size of a cluster in pixels.
 *     'maxZoom': (number) The maximum zoom level that a marker can be part of a
 *                cluster.
 *     'zoomOnClick': (boolean) Whether the default behaviour of clicking on a
 *                    cluster is to zoom into it.
 *     'averageCenter': (boolean) Wether the center of each cluster should be
 *                      the average of all markers in the cluster.
 *     'minimumClusterSize': (number) The minimum number of markers to be in a
 *                           cluster before the markers are hidden and a count
 *                           is shown.
 *     'styles': (object) An object that has style properties:
 *       'url': (string) The image url.
 *       'height': (number) The image height.
 *       'width': (number) The image width.
 *       'anchor': (Array) The anchor position of the label text.
 *       'textColor': (string) The text color.
 *       'textSize': (number) The text size.
 *       'backgroundPosition': (string) The position of the backgound x, y.
 *       'iconAnchor': (Array) The anchor position of the icon x, y.
 * @constructor
 * @extends google.maps.OverlayView
 */
function MarkerClusterer(map, opt_markers, opt_options) {
    // MarkerClusterer implements google.maps.OverlayView interface. We use the
    // extend function to extend MarkerClusterer with google.maps.OverlayView
    // because it might not always be available when the code is defined so we
    // look for it at the last possible moment. If it doesn't exist now then
    // there is no point going ahead :)
    this.extend(MarkerClusterer, google.maps.OverlayView);
    this.map_ = map;

    /**
     * @type {Array.<google.maps.Marker>}
     * @private
     */
    this.markers_ = [];

    /**
     *  @type {Array.<Cluster>}
     */
    this.clusters_ = [];

    this.sizes = [53, 56, 66, 78, 90];

    /**
     * @private
     */
    this.styles_ = [];

    /**
     * @type {boolean}
     * @private
     */
    this.ready_ = false;

    var options = opt_options || {};

    /**
     * @type {number}
     * @private
     */
    this.gridSize_ = options['gridSize'] || 60;

    /**
     * @private
     */
    this.minClusterSize_ = options['minimumClusterSize'] || 2;

    /**
     * @type {?number}
     * @private
     */
    this.maxZoom_ = options['maxZoom'] || null;

    this.styles_ = options['styles'] || [];

    /**
     * @type {string}
     * @private
     */
    this.imagePath_ = options['imagePath'] || this.MARKER_CLUSTER_IMAGE_PATH_;

    /**
     * @type {string}
     * @private
     */
    this.imageExtension_ = options['imageExtension'] || this.MARKER_CLUSTER_IMAGE_EXTENSION_;

    /**
     * @type {boolean}
     * @private
     */
    this.zoomOnClick_ = true;

    if (options['zoomOnClick'] != undefined) {
        this.zoomOnClick_ = options['zoomOnClick'];
    }

    /**
     * @type {boolean}
     * @private
     */
    this.averageCenter_ = false;

    if (options['averageCenter'] != undefined) {
        this.averageCenter_ = options['averageCenter'];
    }

    this.setupStyles_();

    this.setMap(map);

    /**
     * @type {number}
     * @private
     */
    this.prevZoom_ = this.map_.getZoom();

    // Add the map event listeners
    var that = this;
    google.maps.event.addListener(this.map_, 'zoom_changed', function () {
        var zoom = that.map_.getZoom();

        if (that.prevZoom_ != zoom) {
            that.prevZoom_ = zoom;
            that.resetViewport();
        }
    });

    google.maps.event.addListener(this.map_, 'idle', function () {
        that.redraw();
    });

    // Finally, add the markers
    if (opt_markers && opt_markers.length) {
        this.addMarkers(opt_markers, false);
    }
}

/**
 * The marker cluster image path.
 *
 * @type {string}
 * @private
 */
MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_PATH_ = 'https://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/' + 'images/m';

/**
 * The marker cluster image path.
 *
 * @type {string}
 * @private
 */
MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_EXTENSION_ = 'png';

/**
 * Extends a objects prototype by anothers.
 *
 * @param {Object} obj1 The object to be extended.
 * @param {Object} obj2 The object to extend with.
 * @return {Object} The new extended object.
 * @ignore
 */
MarkerClusterer.prototype.extend = function (obj1, obj2) {
    return function (object) {
        for (var property in object.prototype) {
            this.prototype[property] = object.prototype[property];
        }
        return this;
    }.apply(obj1, [obj2]);
};

/**
 * Implementaion of the interface method.
 * @ignore
 */
MarkerClusterer.prototype.onAdd = function () {
    this.setReady_(true);
};

/**
 * Implementaion of the interface method.
 * @ignore
 */
MarkerClusterer.prototype.draw = function () {};

/**
 * Sets up the styles object.
 *
 * @private
 */
MarkerClusterer.prototype.setupStyles_ = function () {
    if (this.styles_.length) {
        return;
    }

    for (var i = 0, size; size = this.sizes[i]; i++) {
        this.styles_.push({
            url: this.imagePath_ + (i + 1) + '.' + this.imageExtension_,
            height: size,
            width: size
        });
    }
};

/**
 *  Fit the map to the bounds of the markers in the clusterer.
 */
MarkerClusterer.prototype.fitMapToMarkers = function () {
    var markers = this.getMarkers();
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, marker; marker = markers[i]; i++) {
        bounds.extend(marker.getPosition());
    }

    this.map_.fitBounds(bounds);
};

/**
 *  Sets the styles.
 *
 *  @param {Object} styles The style to set.
 */
MarkerClusterer.prototype.setStyles = function (styles) {
    this.styles_ = styles;
};

/**
 *  Gets the styles.
 *
 *  @return {Object} The styles object.
 */
MarkerClusterer.prototype.getStyles = function () {
    return this.styles_;
};

/**
 * Whether zoom on click is set.
 *
 * @return {boolean} True if zoomOnClick_ is set.
 */
MarkerClusterer.prototype.isZoomOnClick = function () {
    return this.zoomOnClick_;
};

/**
 * Whether average center is set.
 *
 * @return {boolean} True if averageCenter_ is set.
 */
MarkerClusterer.prototype.isAverageCenter = function () {
    return this.averageCenter_;
};

/**
 *  Returns the array of markers in the clusterer.
 *
 *  @return {Array.<google.maps.Marker>} The markers.
 */
MarkerClusterer.prototype.getMarkers = function () {
    return this.markers_;
};

/**
 *  Returns the number of markers in the clusterer
 *
 *  @return {Number} The number of markers.
 */
MarkerClusterer.prototype.getTotalMarkers = function () {
    return this.markers_.length;
};

/**
 *  Sets the max zoom for the clusterer.
 *
 *  @param {number} maxZoom The max zoom level.
 */
MarkerClusterer.prototype.setMaxZoom = function (maxZoom) {
    this.maxZoom_ = maxZoom;
};

/**
 *  Gets the max zoom for the clusterer.
 *
 *  @return {number} The max zoom level.
 */
MarkerClusterer.prototype.getMaxZoom = function () {
    return this.maxZoom_;
};

/**
 *  The function for calculating the cluster icon image.
 *
 *  @param {Array.<google.maps.Marker>} markers The markers in the clusterer.
 *  @param {number} numStyles The number of styles available.
 *  @return {Object} A object properties: 'text' (string) and 'index' (number).
 *  @private
 */
MarkerClusterer.prototype.calculator_ = function (markers, numStyles) {
    var index = 0;
    var count = markers.length;
    var dv = count;
    while (dv !== 0) {
        dv = parseInt(dv / 10, 10);
        index++;
    }

    index = Math.min(index, numStyles);
    return {
        text: count,
        index: index
    };
};

/**
 * Set the calculator function.
 *
 * @param {function(Array, number)} calculator The function to set as the
 *     calculator. The function should return a object properties:
 *     'text' (string) and 'index' (number).
 *
 */
MarkerClusterer.prototype.setCalculator = function (calculator) {
    this.calculator_ = calculator;
};

/**
 * Get the calculator function.
 *
 * @return {function(Array, number)} the calculator function.
 */
MarkerClusterer.prototype.getCalculator = function () {
    return this.calculator_;
};

/**
 * Add an array of markers to the clusterer.
 *
 * @param {Array.<google.maps.Marker>} markers The markers to add.
 * @param {boolean=} opt_nodraw Whether to redraw the clusters.
 */
MarkerClusterer.prototype.addMarkers = function (markers, opt_nodraw) {
    for (var i = 0, marker; marker = markers[i]; i++) {
        this.pushMarkerTo_(marker);
    }
    if (!opt_nodraw) {
        this.redraw();
    }
};

/**
 * Pushes a marker to the clusterer.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @private
 */
MarkerClusterer.prototype.pushMarkerTo_ = function (marker) {
    marker.isAdded = false;
    if (marker['draggable']) {
        // If the marker is draggable add a listener so we update the clusters on
        // the drag end.
        var that = this;
        google.maps.event.addListener(marker, 'dragend', function () {
            marker.isAdded = false;
            that.repaint();
        });
    }
    this.markers_.push(marker);
};

/**
 * Adds a marker to the clusterer and redraws if needed.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @param {boolean=} opt_nodraw Whether to redraw the clusters.
 */
MarkerClusterer.prototype.addMarker = function (marker, opt_nodraw) {
    this.pushMarkerTo_(marker);
    if (!opt_nodraw) {
        this.redraw();
    }
};

/**
 * Removes a marker and returns true if removed, false if not
 *
 * @param {google.maps.Marker} marker The marker to remove
 * @return {boolean} Whether the marker was removed or not
 * @private
 */
MarkerClusterer.prototype.removeMarker_ = function (marker) {
    var index = -1;
    if (this.markers_.indexOf) {
        index = this.markers_.indexOf(marker);
    } else {
        for (var i = 0, m; m = this.markers_[i]; i++) {
            if (m == marker) {
                index = i;
                break;
            }
        }
    }

    if (index == -1) {
        // Marker is not in our list of markers.
        return false;
    }

    marker.setMap(null);

    this.markers_.splice(index, 1);

    return true;
};

/**
 * Remove a marker from the cluster.
 *
 * @param {google.maps.Marker} marker The marker to remove.
 * @param {boolean=} opt_nodraw Optional boolean to force no redraw.
 * @return {boolean} True if the marker was removed.
 */
MarkerClusterer.prototype.removeMarker = function (marker, opt_nodraw) {
    var removed = this.removeMarker_(marker);

    if (!opt_nodraw && removed) {
        this.resetViewport();
        this.redraw();
        return true;
    } else {
        return false;
    }
};

/**
 * Removes an array of markers from the cluster.
 *
 * @param {Array.<google.maps.Marker>} markers The markers to remove.
 * @param {boolean=} opt_nodraw Optional boolean to force no redraw.
 */
MarkerClusterer.prototype.removeMarkers = function (markers, opt_nodraw) {
    var removed = false;

    for (var i = 0, marker; marker = markers[i]; i++) {
        var r = this.removeMarker_(marker);
        removed = removed || r;
    }

    if (!opt_nodraw && removed) {
        this.resetViewport();
        this.redraw();
        return true;
    }
};

/**
 * Sets the clusterer's ready state.
 *
 * @param {boolean} ready The state.
 * @private
 */
MarkerClusterer.prototype.setReady_ = function (ready) {
    if (!this.ready_) {
        this.ready_ = ready;
        this.createClusters_();
    }
};

/**
 * Returns the number of clusters in the clusterer.
 *
 * @return {number} The number of clusters.
 */
MarkerClusterer.prototype.getTotalClusters = function () {
    return this.clusters_.length;
};

/**
 * Returns the google map that the clusterer is associated with.
 *
 * @return {google.maps.Map} The map.
 */
MarkerClusterer.prototype.getMap = function () {
    return this.map_;
};

/**
 * Sets the google map that the clusterer is associated with.
 *
 * @param {google.maps.Map} map The map.
 */
MarkerClusterer.prototype.setMap = function (map) {
    this.map_ = map;
};

/**
 * Returns the size of the grid.
 *
 * @return {number} The grid size.
 */
MarkerClusterer.prototype.getGridSize = function () {
    return this.gridSize_;
};

/**
 * Sets the size of the grid.
 *
 * @param {number} size The grid size.
 */
MarkerClusterer.prototype.setGridSize = function (size) {
    this.gridSize_ = size;
};

/**
 * Returns the min cluster size.
 *
 * @return {number} The grid size.
 */
MarkerClusterer.prototype.getMinClusterSize = function () {
    return this.minClusterSize_;
};

/**
 * Sets the min cluster size.
 *
 * @param {number} size The grid size.
 */
MarkerClusterer.prototype.setMinClusterSize = function (size) {
    this.minClusterSize_ = size;
};

/**
 * Extends a bounds object by the grid size.
 *
 * @param {google.maps.LatLngBounds} bounds The bounds to extend.
 * @return {google.maps.LatLngBounds} The extended bounds.
 */
MarkerClusterer.prototype.getExtendedBounds = function (bounds) {
    var projection = this.getProjection();

    // Turn the bounds into latlng.
    var tr = new google.maps.LatLng(bounds.getNorthEast().lat(), bounds.getNorthEast().lng());
    var bl = new google.maps.LatLng(bounds.getSouthWest().lat(), bounds.getSouthWest().lng());

    // Convert the points to pixels and the extend out by the grid size.
    var trPix = projection.fromLatLngToDivPixel(tr);
    trPix.x += this.gridSize_;
    trPix.y -= this.gridSize_;

    var blPix = projection.fromLatLngToDivPixel(bl);
    blPix.x -= this.gridSize_;
    blPix.y += this.gridSize_;

    // Convert the pixel points back to LatLng
    var ne = projection.fromDivPixelToLatLng(trPix);
    var sw = projection.fromDivPixelToLatLng(blPix);

    // Extend the bounds to contain the new bounds.
    bounds.extend(ne);
    bounds.extend(sw);

    return bounds;
};

/**
 * Determins if a marker is contained in a bounds.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @param {google.maps.LatLngBounds} bounds The bounds to check against.
 * @return {boolean} True if the marker is in the bounds.
 * @private
 */
MarkerClusterer.prototype.isMarkerInBounds_ = function (marker, bounds) {
    return bounds.contains(marker.getPosition());
};

/**
 * Clears all clusters and markers from the clusterer.
 */
MarkerClusterer.prototype.clearMarkers = function () {
    this.resetViewport(true);

    // Set the markers a empty array.
    this.markers_ = [];
};

/**
 * Clears all existing clusters and recreates them.
 * @param {boolean} opt_hide To also hide the marker.
 */
MarkerClusterer.prototype.resetViewport = function (opt_hide) {
    // Remove all the clusters
    for (var i = 0, cluster; cluster = this.clusters_[i]; i++) {
        cluster.remove();
    }

    // Reset the markers to not be added and to be invisible.
    for (var i = 0, marker; marker = this.markers_[i]; i++) {
        marker.isAdded = false;
        if (opt_hide) {
            marker.setMap(null);
        }
    }

    this.clusters_ = [];
};

/**
 *
 */
MarkerClusterer.prototype.repaint = function () {
    var oldClusters = this.clusters_.slice();
    this.clusters_.length = 0;
    this.resetViewport();
    this.redraw();

    // Remove the old clusters.
    // Do it in a timeout so the other clusters have been drawn first.
    window.setTimeout(function () {
        for (var i = 0, cluster; cluster = oldClusters[i]; i++) {
            cluster.remove();
        }
    }, 0);
};

/**
 * Redraws the clusters.
 */
MarkerClusterer.prototype.redraw = function () {
    this.createClusters_();
};

/**
 * Calculates the distance between two latlng locations in km.
 * @see http://www.movable-type.co.uk/scripts/latlong.html
 *
 * @param {google.maps.LatLng} p1 The first lat lng point.
 * @param {google.maps.LatLng} p2 The second lat lng point.
 * @return {number} The distance between the two points in km.
 * @private
 */
MarkerClusterer.prototype.distanceBetweenPoints_ = function (p1, p2) {
    if (!p1 || !p2) {
        return 0;
    }

    var R = 6371; // Radius of the Earth in km
    var dLat = (p2.lat() - p1.lat()) * Math.PI / 180;
    var dLon = (p2.lng() - p1.lng()) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(p1.lat() * Math.PI / 180) * Math.cos(p2.lat() * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
};

/**
 * Add a marker to a cluster, or creates a new cluster.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @private
 */
MarkerClusterer.prototype.addToClosestCluster_ = function (marker) {
    var distance = 40000; // Some large number
    var clusterToAddTo = null;
    var pos = marker.getPosition();
    for (var i = 0, cluster; cluster = this.clusters_[i]; i++) {
        var center = cluster.getCenter();
        if (center) {
            var d = this.distanceBetweenPoints_(center, marker.getPosition());
            if (d < distance) {
                distance = d;
                clusterToAddTo = cluster;
            }
        }
    }

    if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)) {
        clusterToAddTo.addMarker(marker);
    } else {
        var cluster = new Cluster(this);
        cluster.addMarker(marker);
        this.clusters_.push(cluster);
    }
};

/**
 * Creates the clusters.
 *
 * @private
 */
MarkerClusterer.prototype.createClusters_ = function () {
    if (!this.ready_) {
        return;
    }

    // Get our current map view bounds.
    // Create a new bounds object so we don't affect the map.
    var mapBounds = new google.maps.LatLngBounds(this.map_.getBounds().getSouthWest(), this.map_.getBounds().getNorthEast());
    var bounds = this.getExtendedBounds(mapBounds);

    for (var i = 0, marker; marker = this.markers_[i]; i++) {
        if (!marker.isAdded && this.isMarkerInBounds_(marker, bounds)) {
            this.addToClosestCluster_(marker);
        }
    }
};

/**
 * A cluster that contains markers.
 *
 * @param {MarkerClusterer} markerClusterer The markerclusterer that this
 *     cluster is associated with.
 * @constructor
 * @ignore
 */
function Cluster(markerClusterer) {
    this.markerClusterer_ = markerClusterer;
    this.map_ = markerClusterer.getMap();
    this.gridSize_ = markerClusterer.getGridSize();
    this.minClusterSize_ = markerClusterer.getMinClusterSize();
    this.averageCenter_ = markerClusterer.isAverageCenter();
    this.center_ = null;
    this.markers_ = [];
    this.bounds_ = null;
    this.clusterIcon_ = new ClusterIcon(this, markerClusterer.getStyles(), markerClusterer.getGridSize());
}

/**
 * Determins if a marker is already added to the cluster.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @return {boolean} True if the marker is already added.
 */
Cluster.prototype.isMarkerAlreadyAdded = function (marker) {
    if (this.markers_.indexOf) {
        return this.markers_.indexOf(marker) != -1;
    } else {
        for (var i = 0, m; m = this.markers_[i]; i++) {
            if (m == marker) {
                return true;
            }
        }
    }
    return false;
};

/**
 * Add a marker the cluster.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @return {boolean} True if the marker was added.
 */
Cluster.prototype.addMarker = function (marker) {
    if (this.isMarkerAlreadyAdded(marker)) {
        return false;
    }

    if (!this.center_) {
        this.center_ = marker.getPosition();
        this.calculateBounds_();
    } else {
        if (this.averageCenter_) {
            var l = this.markers_.length + 1;
            var lat = (this.center_.lat() * (l - 1) + marker.getPosition().lat()) / l;
            var lng = (this.center_.lng() * (l - 1) + marker.getPosition().lng()) / l;
            this.center_ = new google.maps.LatLng(lat, lng);
            this.calculateBounds_();
        }
    }

    marker.isAdded = true;
    this.markers_.push(marker);

    var len = this.markers_.length;
    if (len < this.minClusterSize_ && marker.getMap() != this.map_) {
        // Min cluster size not reached so show the marker.
        marker.setMap(this.map_);
    }

    if (len == this.minClusterSize_) {
        // Hide the markers that were showing.
        for (var i = 0; i < len; i++) {
            this.markers_[i].setMap(null);
        }
    }

    if (len >= this.minClusterSize_) {
        marker.setMap(null);
    }

    this.updateIcon();
    return true;
};

/**
 * Returns the marker clusterer that the cluster is associated with.
 *
 * @return {MarkerClusterer} The associated marker clusterer.
 */
Cluster.prototype.getMarkerClusterer = function () {
    return this.markerClusterer_;
};

/**
 * Returns the bounds of the cluster.
 *
 * @return {google.maps.LatLngBounds} the cluster bounds.
 */
Cluster.prototype.getBounds = function () {
    var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
    var markers = this.getMarkers();
    for (var i = 0, marker; marker = markers[i]; i++) {
        bounds.extend(marker.getPosition());
    }
    return bounds;
};

/**
 * Removes the cluster
 */
Cluster.prototype.remove = function () {
    this.clusterIcon_.remove();
    this.markers_.length = 0;
    delete this.markers_;
};

/**
 * Returns the center of the cluster.
 *
 * @return {number} The cluster center.
 */
Cluster.prototype.getSize = function () {
    return this.markers_.length;
};

/**
 * Returns the center of the cluster.
 *
 * @return {Array.<google.maps.Marker>} The cluster center.
 */
Cluster.prototype.getMarkers = function () {
    return this.markers_;
};

/**
 * Returns the center of the cluster.
 *
 * @return {google.maps.LatLng} The cluster center.
 */
Cluster.prototype.getCenter = function () {
    return this.center_;
};

/**
 * Calculated the extended bounds of the cluster with the grid.
 *
 * @private
 */
Cluster.prototype.calculateBounds_ = function () {
    var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
    this.bounds_ = this.markerClusterer_.getExtendedBounds(bounds);
};

/**
 * Determines if a marker lies in the clusters bounds.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @return {boolean} True if the marker lies in the bounds.
 */
Cluster.prototype.isMarkerInClusterBounds = function (marker) {
    return this.bounds_.contains(marker.getPosition());
};

/**
 * Returns the map that the cluster is associated with.
 *
 * @return {google.maps.Map} The map.
 */
Cluster.prototype.getMap = function () {
    return this.map_;
};

/**
 * Updates the cluster icon
 */
Cluster.prototype.updateIcon = function () {
    var zoom = this.map_.getZoom();
    var mz = this.markerClusterer_.getMaxZoom();

    if (mz && zoom > mz) {
        // The zoom is greater than our max zoom so show all the markers in cluster.
        for (var i = 0, marker; marker = this.markers_[i]; i++) {
            marker.setMap(this.map_);
        }
        return;
    }

    if (this.markers_.length < this.minClusterSize_) {
        // Min cluster size not yet reached.
        this.clusterIcon_.hide();
        return;
    }

    var numStyles = this.markerClusterer_.getStyles().length;
    var sums = this.markerClusterer_.getCalculator()(this.markers_, numStyles);
    this.clusterIcon_.setCenter(this.center_);
    this.clusterIcon_.setSums(sums);
    this.clusterIcon_.show();
};

/**
 * A cluster icon
 *
 * @param {Cluster} cluster The cluster to be associated with.
 * @param {Object} styles An object that has style properties:
 *     'url': (string) The image url.
 *     'height': (number) The image height.
 *     'width': (number) The image width.
 *     'anchor': (Array) The anchor position of the label text.
 *     'textColor': (string) The text color.
 *     'textSize': (number) The text size.
 *     'backgroundPosition: (string) The background postition x, y.
 * @param {number=} opt_padding Optional padding to apply to the cluster icon.
 * @constructor
 * @extends google.maps.OverlayView
 * @ignore
 */
function ClusterIcon(cluster, styles, opt_padding) {
    cluster.getMarkerClusterer().extend(ClusterIcon, google.maps.OverlayView);

    this.styles_ = styles;
    this.padding_ = opt_padding || 0;
    this.cluster_ = cluster;
    this.center_ = null;
    this.map_ = cluster.getMap();
    this.div_ = null;
    this.sums_ = null;
    this.visible_ = false;

    this.setMap(this.map_);
}

/**
 * Triggers the clusterclick event and zoom's if the option is set.
 *
 * @param {google.maps.MouseEvent} event The event to propagate
 */
ClusterIcon.prototype.triggerClusterClick = function (event) {
    var markerClusterer = this.cluster_.getMarkerClusterer();

    // Trigger the clusterclick event.
    google.maps.event.trigger(markerClusterer, 'clusterclick', this.cluster_, event);

    if (markerClusterer.isZoomOnClick()) {
        // Zoom into the cluster.
        this.map_.fitBounds(this.cluster_.getBounds());
    }
};

/**
 * Adding the cluster icon to the dom.
 * @ignore
 */
ClusterIcon.prototype.onAdd = function () {
    this.div_ = document.createElement('DIV');
    if (this.visible_) {
        var pos = this.getPosFromLatLng_(this.center_);
        this.div_.style.cssText = this.createCss(pos);
        this.div_.innerHTML = this.sums_.text;
    }

    var panes = this.getPanes();
    panes.overlayMouseTarget.appendChild(this.div_);

    var that = this;
    google.maps.event.addDomListener(this.div_, 'click', function (event) {
        that.triggerClusterClick(event);
    });
};

/**
 * Returns the position to place the div dending on the latlng.
 *
 * @param {google.maps.LatLng} latlng The position in latlng.
 * @return {google.maps.Point} The position in pixels.
 * @private
 */
ClusterIcon.prototype.getPosFromLatLng_ = function (latlng) {
    var pos = this.getProjection().fromLatLngToDivPixel(latlng);

    if (_typeof(this.iconAnchor_) === 'object' && this.iconAnchor_.length === 2) {
        pos.x -= this.iconAnchor_[0];
        pos.y -= this.iconAnchor_[1];
    } else {
        pos.x -= parseInt(this.width_ / 2, 10);
        pos.y -= parseInt(this.height_ / 2, 10);
    }
    return pos;
};

/**
 * Draw the icon.
 * @ignore
 */
ClusterIcon.prototype.draw = function () {
    if (this.visible_) {
        var pos = this.getPosFromLatLng_(this.center_);
        this.div_.style.top = pos.y + 'px';
        this.div_.style.left = pos.x + 'px';
    }
};

/**
 * Hide the icon.
 */
ClusterIcon.prototype.hide = function () {
    if (this.div_) {
        this.div_.style.display = 'none';
    }
    this.visible_ = false;
};

/**
 * Position and show the icon.
 */
ClusterIcon.prototype.show = function () {
    if (this.div_) {
        var pos = this.getPosFromLatLng_(this.center_);
        this.div_.style.cssText = this.createCss(pos);
        this.div_.style.display = '';
    }
    this.visible_ = true;
};

/**
 * Remove the icon from the map
 */
ClusterIcon.prototype.remove = function () {
    this.setMap(null);
};

/**
 * Implementation of the onRemove interface.
 * @ignore
 */
ClusterIcon.prototype.onRemove = function () {
    if (this.div_ && this.div_.parentNode) {
        this.hide();
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
    }
};

/**
 * Set the sums of the icon.
 *
 * @param {Object} sums The sums containing:
 *   'text': (string) The text to display in the icon.
 *   'index': (number) The style index of the icon.
 */
ClusterIcon.prototype.setSums = function (sums) {
    this.sums_ = sums;
    this.text_ = sums.text;
    this.index_ = sums.index;
    if (this.div_) {
        this.div_.innerHTML = sums.text;
    }

    this.useStyle();
};

/**
 * Sets the icon to the the styles.
 */
ClusterIcon.prototype.useStyle = function () {
    var index = Math.max(0, this.sums_.index - 1);
    index = Math.min(this.styles_.length - 1, index);
    var style = this.styles_[index];
    this.url_ = style['url'];
    this.height_ = style['height'];
    this.width_ = style['width'];
    this.textColor_ = style['textColor'];
    this.anchor_ = style['anchor'];
    this.textSize_ = style['textSize'];
    this.backgroundPosition_ = style['backgroundPosition'];
    this.iconAnchor_ = style['iconAnchor'];
};

/**
 * Sets the center of the icon.
 *
 * @param {google.maps.LatLng} center The latlng to set as the center.
 */
ClusterIcon.prototype.setCenter = function (center) {
    this.center_ = center;
};

/**
 * Create the css text based on the position of the icon.
 *
 * @param {google.maps.Point} pos The position.
 * @return {string} The css style text.
 */
ClusterIcon.prototype.createCss = function (pos) {
    var style = [];
    style.push('background-image:url(' + this.url_ + ');');
    var backgroundPosition = this.backgroundPosition_ ? this.backgroundPosition_ : '0 0';
    style.push('background-position:' + backgroundPosition + ';');

    if (_typeof(this.anchor_) === 'object') {
        if (typeof this.anchor_[0] === 'number' && this.anchor_[0] > 0 && this.anchor_[0] < this.height_) {
            style.push('height:' + (this.height_ - this.anchor_[0]) + 'px; padding-top:' + this.anchor_[0] + 'px;');
        } else if (typeof this.anchor_[0] === 'number' && this.anchor_[0] < 0 && -this.anchor_[0] < this.height_) {
            style.push('height:' + this.height_ + 'px; line-height:' + (this.height_ + this.anchor_[0]) + 'px;');
        } else {
            style.push('height:' + this.height_ + 'px; line-height:' + this.height_ + 'px;');
        }
        if (typeof this.anchor_[1] === 'number' && this.anchor_[1] > 0 && this.anchor_[1] < this.width_) {
            style.push('width:' + (this.width_ - this.anchor_[1]) + 'px; padding-left:' + this.anchor_[1] + 'px;');
        } else {
            style.push('width:' + this.width_ + 'px; text-align:center;');
        }
    } else {
        style.push('height:' + this.height_ + 'px; line-height:' + this.height_ + 'px; width:' + this.width_ + 'px; text-align:center;');
    }

    var txtColor = this.textColor_ ? this.textColor_ : 'black';
    var txtSize = this.textSize_ ? this.textSize_ : 11;

    style.push('cursor:pointer; top:' + pos.y + 'px; left:' + pos.x + 'px; color:' + txtColor + '; position:absolute; font-size:' + txtSize + 'px; font-family:Arial,sans-serif; font-weight:bold');
    return style.join('');
};

// Export Symbols for Closure
// If you are not going to compile with closure then you can remove the
// code below.
window['MarkerClusterer'] = MarkerClusterer;
MarkerClusterer.prototype['addMarker'] = MarkerClusterer.prototype.addMarker;
MarkerClusterer.prototype['addMarkers'] = MarkerClusterer.prototype.addMarkers;
MarkerClusterer.prototype['clearMarkers'] = MarkerClusterer.prototype.clearMarkers;
MarkerClusterer.prototype['fitMapToMarkers'] = MarkerClusterer.prototype.fitMapToMarkers;
MarkerClusterer.prototype['getCalculator'] = MarkerClusterer.prototype.getCalculator;
MarkerClusterer.prototype['getGridSize'] = MarkerClusterer.prototype.getGridSize;
MarkerClusterer.prototype['getExtendedBounds'] = MarkerClusterer.prototype.getExtendedBounds;
MarkerClusterer.prototype['getMap'] = MarkerClusterer.prototype.getMap;
MarkerClusterer.prototype['getMarkers'] = MarkerClusterer.prototype.getMarkers;
MarkerClusterer.prototype['getMaxZoom'] = MarkerClusterer.prototype.getMaxZoom;
MarkerClusterer.prototype['getStyles'] = MarkerClusterer.prototype.getStyles;
MarkerClusterer.prototype['getTotalClusters'] = MarkerClusterer.prototype.getTotalClusters;
MarkerClusterer.prototype['getTotalMarkers'] = MarkerClusterer.prototype.getTotalMarkers;
MarkerClusterer.prototype['redraw'] = MarkerClusterer.prototype.redraw;
MarkerClusterer.prototype['removeMarker'] = MarkerClusterer.prototype.removeMarker;
MarkerClusterer.prototype['removeMarkers'] = MarkerClusterer.prototype.removeMarkers;
MarkerClusterer.prototype['resetViewport'] = MarkerClusterer.prototype.resetViewport;
MarkerClusterer.prototype['repaint'] = MarkerClusterer.prototype.repaint;
MarkerClusterer.prototype['setCalculator'] = MarkerClusterer.prototype.setCalculator;
MarkerClusterer.prototype['setGridSize'] = MarkerClusterer.prototype.setGridSize;
MarkerClusterer.prototype['setMaxZoom'] = MarkerClusterer.prototype.setMaxZoom;
MarkerClusterer.prototype['onAdd'] = MarkerClusterer.prototype.onAdd;
MarkerClusterer.prototype['draw'] = MarkerClusterer.prototype.draw;

Cluster.prototype['getCenter'] = Cluster.prototype.getCenter;
Cluster.prototype['getSize'] = Cluster.prototype.getSize;
Cluster.prototype['getMarkers'] = Cluster.prototype.getMarkers;

ClusterIcon.prototype['onAdd'] = ClusterIcon.prototype.onAdd;
ClusterIcon.prototype['draw'] = ClusterIcon.prototype.draw;
ClusterIcon.prototype['onRemove'] = ClusterIcon.prototype.onRemove;
;;
function EventHelpers() {
    throw new Error('Do not initialize this class - please only use the static methods');
}

/**
 * debouncing, executes the function if there was no new event in $wait milliseconds
 * @param func
 * @param wait
 * @param scope
 * @returns {Function}
 */
EventHelpers.debounce = function (func, wait, scope) {
    var timeout;
    return function () {
        var context = scope || this,
            args = arguments;
        var later = function later() {
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * in case of a "storm of events", this executes once every $threshold
 * @param fn
 * @param threshhold
 * @param scope
 * @returns {Function}
 */
EventHelpers.throttle = function (fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last, deferTimer;
    return function () {
        var context = scope || this;

        var now = +new Date(),
            args = arguments;
        if (last && now < last + threshhold) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = now;
                fn.apply(context, args);
            }, threshhold);
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
};

;;
/**
 * @typedef {Object} LocationManager~marker
 * @property {HTMLElement} element - The DOM element of this marker in the DOM
 * @property {google.maps.Marker} marker - The marker object in the list
 *
 * @property {boolean} [showInList] - Whether or not the marker should be displayed in the list
 * @property {boolean} [showOnMap] - Whether or not the marker should be displayed on the map
 * @property {boolean} [fixed] - Whether or not the marker is fixed (should not be effected by sorting & hiding
 */

var LocationManager = function () {

    /**
     * @param {LocationManager~settings} settings
     */


    /**
     * @type {google.maps.Map}
     */
    function LocationManager(settings) {
        var _this = this;

        _classCallCheck(this, LocationManager);

        this.marker = [];
        this._controllers = [];

        this._settings = this._prepareSettings(settings);
        this._log(this._settings);

        this._initializeMap();
        this._initializeMarker();
        // wait for google maps initialization
        var listenerHandle = google.maps.event.addListener(this.map, 'bounds_changed', function (_) {
            _this._initializeControllers();
            google.maps.event.removeListener(listenerHandle);
        });

        if (this._settings.centerOnMarkers) {
            this.centerMapOnShownMarkers();
        }
    }

    /**
     * adjusts the map bounds in a way, that all current markers are visible
     * on the map
     * @returns {void}
     */


    /**
     * @type {LocationManager~marker[]}
     */


    _createClass(LocationManager, [{
        key: 'centerMapOnShownMarkers',
        value: function centerMapOnShownMarkers() {
            var bounds = new google.maps.LatLngBounds();

            this._markerClusterer.getMarkers().forEach(function (marker) {
                if (!isNaN(parseFloat(marker.getPosition().lat())) && !isNaN(parseFloat(marker.getPosition().lng()))) {
                    bounds = bounds.extend(marker.getPosition());
                }
            });

            this.map.fitBounds(bounds);
        }

        /**
         * Method that is executed everytime a user moves the map
         * @returns {void}
         */

    }, {
        key: 'onMapMove',
        value: function onMapMove() {
            this._controllers.forEach(function (controller) {
                controller.onMapMove();
            });
        }

        /**
         * Method that is executed everytime a user clicks on a marker
         * @param {LocationManager~marker} marker
         */

    }, {
        key: 'onMarkerClick',
        value: function onMarkerClick(marker) {
            this._log('onMarkerClick', marker);
            this._controllers.forEach(function (controller) {
                controller.onMarkerClick(marker);
            });
        }

        /**
         * Updates the marker that are visible on map
         * @returns {void}
         */

    }, {
        key: 'updateMap',
        value: function updateMap() {
            this._log('updateMap');
            var markerToShow = this._getProcessedMarker().filter(function (marker) {
                return marker.showOnMap;
            }).map(function (marker) {
                return marker.marker;
            });

            this._markerClusterer.clearMarkers();
            this._markerClusterer.addMarkers(markerToShow);
        }

        /**
         * Updates the marker that should be visible in the list
         * @returns {void}
         */

    }, {
        key: 'updateList',
        value: function updateList() {
            var _this2 = this;

            this._log('updateList');

            var child = void 0;
            while (child = this._settings.markerContainer.firstChild) {
                this._settings.markerContainer.removeChild(child);
            }

            this._getProcessedMarker().forEach(function (marker) {
                if (marker.fixed) {
                    return;
                }
                if (marker.showInList) {
                    _this2._settings.markerContainer.appendChild(marker.element);
                }
            });
        }

        /**
         * Adds a new controller to the LocationManager
         * @param {LocationManagerControllerInterface} controller
         */

    }, {
        key: 'addController',
        value: function addController(controller) {
            this._log('addController', controller);
            this._controllers.push(controller);
            // execute init method in promise
            new Promise(controller.init.bind(controller, this));
        }

        /**
         * Get's the controller with the given type that is associated with the current instance
         * Returns null, if no controller with that type was found
         *
         * @example
         * locationManager.getController(InfoWindowController)
         *
         * @returns {LocationManagerControllerInterface}
         */

    }, {
        key: 'getController',
        value: function getController(Constructor) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._controllers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var controller = _step.value;

                    if (controller instanceof Constructor) {
                        return controller;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return null;
        }

        /**
         * Prepares the settings: sets defaults and converts datatypes.
         * Returns an settings object that is usable within this class
         *
         * @param settings
         * @return {*}
         * @private
         */

    }, {
        key: '_prepareSettings',
        value: function _prepareSettings(settings) {
            settings = settings || {};
            var DEFAULTS = {
                longAttribute: 'data-longitude',
                latAttribute: 'data-latitude',
                fixedAttribute: 'data-fixed',
                mapOptions: {
                    center: {
                        lat: 47.920130,
                        lng: 7.705250
                    },
                    zoom: 10,
                    zoomControlOptions: {
                        position: google.maps.ControlPosition.RIGHT_CENTER
                    }
                },
                clusterer: {
                    gridSize: 60,
                    zoomOnClick: true,
                    styles: [{
                        url: '/typo3conf/ext/location_manager/Resources/Public/Images/Cluster.png',
                        width: 53,
                        height: 52,
                        textColor: '#000'
                    }]
                },
                controllerFactory: {},
                debug: false,
                centerOnMarkers: false
            };

            // if no correct center was given, the map will be initialized with a set of coordinates but be zoomed
            // to fit the markers right away.
            if (!settings.mapOptions || !settings.mapOptions.center || !settings.mapOptions.center.lat || !settings.mapOptions.center.lng) {
                settings.centerOnMarkers = true;
            }

            // if no correct center was given, the map will be initialized with a set of coordinates but be zoomed
            // to fit the markers right away.
            // if (!settings.mapOptions || !settings.mapOptions.center || !settings.mapOptions.center.lat || !settings.mapOptions.center.lng) {
            //    settings.zoomToMarkers = true;
            // }

            settings = $.extend(true, {}, DEFAULTS, settings);

            // All DOM Elements in the settings can be supplied as strings which will have to be initialized
            var domSettings = ['markerElements'];
            var singleDomSettings = ['mapContainer', 'markerContainer'];

            singleDomSettings.forEach(function (setting) {
                if (typeof settings[setting] === 'string') {
                    settings[setting] = document.querySelector(settings[setting]);
                }
            });
            domSettings.forEach(function (setting) {
                if (typeof settings[setting] === 'string') {
                    settings[setting] = document.querySelectorAll(settings[setting]);
                }
            });

            if (!settings.markerContainer && !settings.markerElements) {
                throw new Error('At least one of markerContainer or markerElements must be specified');
            } else if (settings.markerElements && !settings.markerContainer) {
                settings.markerContainer = settings.markerElements[0].parentNode;
            } else if (settings.markerContainer && !settings.markerElements) {
                settings.markerElements = settings.markerContainer.childNodes;
            }

            // NodeList to Node[]
            settings.markerElements = Array.prototype.slice.call(settings.markerElements);

            return settings;
        }

        /**
         * @type {MarkerClusterer}
         */


        /**
         * @type {LocationManager~settings}
         */


        /**
         *
         * @type {LocationManagerControllerInterface[]}
         * @private
         */

    }, {
        key: '_log',


        /**
         * Simple abstraction over logging for LocationManager:
         * If the 'debug' setting is set to 'true', all arguments will be prefixed with 'LocationManager' and
         * then logged in the console
         *
         * @private
         */
        value: function _log() {
            if (!this._settings.debug) {
                return;
            }
            var args = Array.prototype.slice.call(arguments);
            args.unshift("LocationManager");
            console.log.apply(console, args);
        }

        /**
         * Initializes the map with all settings
         *
         * @private
         */

    }, {
        key: '_initializeMap',
        value: function _initializeMap() {
            this._log('_initializeMap', this._settings.mapContainer, this._settings.mapOptions);

            var map = new google.maps.Map(this._settings.mapContainer, this._settings.mapOptions);
            map.addListener('bounds_changed', EventHelpers.throttle(this.onMapMove, 20, this));

            this.map = map;
            this._log('_initializeMap', map);
        }

        /**
         * Initializes the marker array in this._marker and the clusterer.
         *
         * @private
         */

    }, {
        key: '_initializeMarker',
        value: function _initializeMarker() {
            var _this3 = this;

            this._log('_initializeMarker');
            var googleMapsMarkers = [];

            // initialize markers
            this._settings.markerElements.forEach(function (markerElement) {
                var lat = parseFloat(markerElement.getAttribute(_this3._settings.latAttribute));
                var lng = parseFloat(markerElement.getAttribute(_this3._settings.longAttribute));

                if (isNaN(lat) || isNaN(lng)) {
                    console.warn('LocationManager', 'marker has at least one undefined coordinate', { lat: lat, lng: lng }, markerElement, _this3);
                }

                var markerSettings = {
                    map: _this3.map,
                    icon: _this3._settings.markerIcon,
                    position: {
                        lat: lat || 0,
                        lng: lng || 0
                    }
                };
                _this3._log('_initializeMarker', markerSettings);
                /**
                 * @type {LocationManager~marker}
                 */
                var marker = {
                    element: markerElement,
                    marker: new google.maps.Marker(markerSettings),
                    showOnMap: true,
                    showInList: true,
                    fixed: !!markerElement.getAttribute(_this3._settings.fixedAttribute)
                };
                marker.marker.addListener('click', function () {
                    _this3.onMarkerClick(marker);
                });
                _this3.marker.push(marker);
                googleMapsMarkers.push(marker.marker);
            });

            // initialize marker clusterer
            if (this._settings.clusterer !== false) {
                this._markerClusterer = new MarkerClusterer(this.map, googleMapsMarkers, this._settings.clusterer);
                this._log('_initializeMarker', this._markerClusterer);
            }
        }

        /**
         * Initializes the controllers out of the controllerFactory setting
         * @private
         */

    }, {
        key: '_initializeControllers',
        value: function _initializeControllers() {
            var _this4 = this;

            this._log('_initializeControllers');
            Object.keys(this._settings.controllerFactory).forEach(function (name) {
                var controller = LocationManagerControllerFactory.make(name, _this4._settings.controllerFactory[name]);
                if (controller !== null) {
                    _this4.addController(controller);
                } else {
                    console.warn('LocationManager', 'No controller ' + name + ' exists, skipping');
                }
            });
        }

        /**
         * Returns the markers with the necessary preprocessing applied.
         * This method should never be called in the controllers themselves as this could lead to loops.
         *
         * @return {LocationManager~marker[]}
         * @private
         */

    }, {
        key: '_getProcessedMarker',
        value: function _getProcessedMarker() {
            var _this5 = this;

            this._log('_getProcessedMarker');
            this._controllers.forEach(function (controller) {
                controller.preprocess(_this5.marker);
            });

            return this.marker;
        }
    }]);

    return LocationManager;
}();

;;

var LocationManagerControllerFactory = function () {
    function LocationManagerControllerFactory() {
        _classCallCheck(this, LocationManagerControllerFactory);
    }

    _createClass(LocationManagerControllerFactory, null, [{
        key: 'register',


        /**
         * Registers a new Constructor with the factory
         *
         * @param name
         * @param Constructor
         */
        value: function register(name, Constructor) {
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


        /**
         * Map of all of the constructors for the factory
         *
         * @type {{}}
         * @private
         */

    }, {
        key: 'make',
        value: function make(name, settings) {
            if (LocationManagerControllerFactory._constructors[name]) {
                return new LocationManagerControllerFactory._constructors[name](settings);
            }
            return null;
        }
    }]);

    return LocationManagerControllerFactory;
}();

LocationManagerControllerFactory._constructors = {};

;;

var MapsHelper = function () {
    function MapsHelper() {
        _classCallCheck(this, MapsHelper);
    }

    _createClass(MapsHelper, [{
        key: 'degToRad',


        /**
         * Helper function that converts degrees into radians
         * @param {number} deg - degrees
         * @returns {number} - radians
         */
        value: function degToRad(deg) {
            return deg * Math.PI / 180;
        }

        /**
         * moves a given point by a given amount of kilometers.
         * We are using a approximation for this, which turns out to be fairly accurate.
         *
         * The returned position is a new instance of LatLngBounds
         *
         * @see http://stackoverflow.com/a/1253545
         * @see https://en.wikipedia.org/wiki/Latitude#Length_of_a_degree_of_latitude
         *
         * @param {google.maps.LatLng} latlng
         * @param {{ lat: number, lng: number }} offset
         * @returns {google.maps.LatLng}
         */

    }, {
        key: 'latLngKilometerOffset',
        value: function latLngKilometerOffset(latlng, offset) {
            var lat = latlng.lat() + offset.lat / 110.574;
            var lng = latlng.lng() + offset.lng / (111.320 * Math.cos(this.degToRad(latlng.lat())));

            if (lat > 80) {
                lat = 80;
            } else if (lat < -80) {
                lat = -80;
            }
            if (lng > 180) {
                lng = 180;
            } else if (lng < -180) {
                lng = -180;
            }

            return new google.maps.LatLng(lat, lng);
        }

        /**
         * Takes a given latLng bounds and expands it by the given amount into all directions
         *
         * @param {google.maps.LatLngBounds} bounds
         * @param {number} kilometers
         * @returns {google.maps.LatLngBounds}
         */

    }, {
        key: 'expandLatLngBounds',
        value: function expandLatLngBounds(bounds, kilometers) {
            // the length of the sides of a right-angled triangle with 45deg angles.
            var distance = kilometers;

            var ne = bounds.getNorthEast();
            var sw = bounds.getSouthWest();

            ne = this.latLngKilometerOffset(ne, { lat: distance, lng: distance });
            sw = this.latLngKilometerOffset(sw, { lat: -distance, lng: -distance });

            return new google.maps.LatLngBounds(sw, ne);
        }
    }]);

    return MapsHelper;
}();

;;
/**
 * Handles the search using google maps Autocomplete
 *
 * @implements LocationManagerControllerInterface
 */

var AutocompletedSearchController = function () {

    /**
     * @param {AutocompletedSearchController~settings} settings
     */


    /**
     * @type {LocationManager}
     */


    /**
     * @type {AutocompletedSearchController~settings}
     */
    function AutocompletedSearchController(settings) {
        _classCallCheck(this, AutocompletedSearchController);

        this.mapsHelper = new MapsHelper();

        settings = settings || {};
        settings.field = settings.field || '.location-manager__button';
        settings.autocompleteOptions = settings.autocompleteOptions || { types: ['(regions)'] };

        this.settings = settings;
    }

    /**
     * @param {LocationManager} locationManager
     */


    /**
     * @type {MapsHelper}
     */


    /**
     * @type {google.maps.Geocoder}
     */


    _createClass(AutocompletedSearchController, [{
        key: 'init',
        value: function init(locationManager) {
            var _this6 = this;

            this.locationManager = locationManager;
            this.geocoder = new google.maps.Geocoder();

            var autocomplete = new google.maps.places.Autocomplete(document.querySelector(this.settings.field), this.settings.autocompleteOptions);
            autocomplete.addListener('place_changed', function () {
                _this6.query(autocomplete.getPlace());
            });

            // find form
            var node = document.querySelector(this.settings.field);
            var form = void 0;
            do {
                if (node.nodeName === 'FORM') {
                    form = node;
                    break;
                }
            } while (node = node.parentNode);

            if (form) {
                form.addEventListener('submit', function (e) {
                    e.preventDefault();
                    _this6.query(autocomplete.getPlace());
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

    }, {
        key: 'query',
        value: function query(place) {
            var _this7 = this;

            if (place && place.geometry && place.geometry.viewport) {
                this.goToBounds(place.geometry.viewport);
                return;
            }

            this.geocoder.geocode({
                address: document.querySelector(this.settings.field).value
            }, function (results, status) {
                /** @type {google.maps.GeocoderResult[]} results **/

                if (status !== google.maps.GeocoderStatus.OK) {
                    throw new Error('Google Maps Geocoder error ' + status + ' - ' + JSON.stringify(results));
                }

                _this7.goToBounds(results[0].geometry.bounds);
            });
        }

        /**
         * Moves the bounds to the given bounds
         * @param {google.maps.LatLngBounds} bounds
         */

    }, {
        key: 'goToBounds',
        value: function goToBounds(bounds) {
            if (this.settings.expand) {
                bounds = this.mapsHelper.expandLatLngBounds(bounds, this.settings.expand);
            }
            this.locationManager.map.fitBounds(bounds);

            /** @type {HideMapOnMobileController} */
            var hideMapOnMobile = this.locationManager.getController(HideMapOnMobileController);
            if (!hideMapOnMobile || hideMapOnMobile.isMapShown()) {
                this.locationManager._settings.mapContainer.scrollIntoView(true);
            }
        }
    }, {
        key: 'onMarkerClick',
        value: function onMarkerClick() {}
    }, {
        key: 'onMapMove',
        value: function onMapMove() {}
    }, {
        key: 'preprocess',
        value: function preprocess() {}
    }]);

    return AutocompletedSearchController;
}();

LocationManagerControllerFactory.register('autocompletedSearch', AutocompletedSearchController);
;;
/**
 * Enables moving the map after clicking inside, disables it after hovering over the element
 *
 * @implements LocationManagerControllerInterface
 */

var ClickToEnableController = function () {

    /**
     * @param {ClickToEnableController~settings} settings
     */
    function ClickToEnableController(settings) {
        _classCallCheck(this, ClickToEnableController);

        settings = settings || {};
        settings.enabled = settings.enabled || '.location-manager__toggle_enabled';
        settings.disabled = settings.disabled || '.location-manager__toggle_disabled';

        if (typeof settings.enabled === 'string') {
            settings.enabled = document.querySelector(settings.enabled);
        }
        if (typeof settings.disabled === 'string') {
            settings.disabled = document.querySelector(settings.disabled);
        }

        this.settings = settings;
    }

    /**
     * @param {LocationManager} locationManager
     */


    /**
     * @type {ClickToEnableController~settings}
     */


    _createClass(ClickToEnableController, [{
        key: 'init',
        value: function init(locationManager) {
            // enable map
            locationManager.map.addListener('click', this.enableDragging.bind(this, true, locationManager));
            // disable map
            this.settings.enabled.addEventListener('mouseover', this.enableDragging.bind(this, false, locationManager));
            // disable by default
            this.enableDragging(false, locationManager);
        }

        /**
         * Enables or disables dragging on the map and shows the correct element for that state
         *
         * @param {boolean} enable
         * @param {LocationManager} locationManager
         */

    }, {
        key: 'enableDragging',
        value: function enableDragging(enable, locationManager) {
            locationManager.map.setOptions({
                draggable: enable,
                scrollwheel: enable
            });

            if (enable) {
                this.settings.enabled.style.removeProperty('display');
                this.settings.disabled.style.display = 'none';
            } else {
                this.settings.enabled.style.display = 'none';
                this.settings.disabled.style.removeProperty('display');
            }
        }
    }, {
        key: 'onMapMove',
        value: function onMapMove() {}
    }, {
        key: 'onMarkerClick',
        value: function onMarkerClick() {}
    }, {
        key: 'preprocess',
        value: function preprocess() {}
    }]);

    return ClickToEnableController;
}();

LocationManagerControllerFactory.register('clickToEnable', ClickToEnableController);
;;
/**
 * Enables the use of dynamic marker icons
 *
 * @implements LocationManagerControllerInterface
 */

var DynamicMarkerImageController = function () {

    /**
     * @param {DynamicMarkerImageController~settings} settings
     */
    function DynamicMarkerImageController(settings) {
        _classCallCheck(this, DynamicMarkerImageController);

        settings = settings || {};
        settings.attribute = settings.attribute || 'data-marker';

        this.settings = settings;
    }

    /**
     * @param {LocationManager} locationManager
     */


    /**
     * @type {DynamicMarkerImageController~settings}
     */


    _createClass(DynamicMarkerImageController, [{
        key: 'init',
        value: function init(locationManager) {
            var _this8 = this;

            locationManager.marker.forEach(function (marker) {
                var icon = marker.element.getAttribute(_this8.settings.attribute);
                if (icon) {
                    marker.marker.setIcon(icon);
                }
            });
        }
    }, {
        key: 'onMapMove',
        value: function onMapMove() {}
    }, {
        key: 'onMarkerClick',
        value: function onMarkerClick() {}
    }, {
        key: 'preprocess',
        value: function preprocess() {}
    }]);

    return DynamicMarkerImageController;
}();

LocationManagerControllerFactory.register('dynamicMarkerImage', DynamicMarkerImageController);
;;
/**
 * Hides the map on mobile devices.
 * Note: In order to preserve functionality on mobile devices, the map is note actually hidden,
 *       moved outside of the viewport
 *
 * @implements LocationManagerControllerInterface
 */

var HideMapOnMobileController = function () {

    /**
     * @param {HideMapOnMobileController~settings} settings
     */


    /**
     * @type {JQuery}
     */
    function HideMapOnMobileController(settings) {
        _classCallCheck(this, HideMapOnMobileController);

        settings = settings || {};
        settings.threshold = settings.threshold || 768;
        settings.throttle = settings.throttle || 300;

        if (typeof settings.mapContainer === 'string') {
            this.$mapContainer = $(settings.mapContainer);
        }

        this.settings = settings;

        if (settings.throttle) {
            this._onWindowResizeThrottled = EventHelpers.throttle(this.onWindowResize, settings.throttle, this);
        } else {
            this._onWindowResizeThrottled = this.onWindowResize;
        }
    }

    /**
     * @param {LocationManager} locationManager
     */


    /**
     * @type {Function}
     */


    /**
     * @type {HideMapOnMobileController~settings}
     */


    _createClass(HideMapOnMobileController, [{
        key: 'init',
        value: function init(locationManager) {
            if (!this.$mapContainer) {
                this.$mapContainer = $(locationManager._settings.mapContainer);
            }

            window.addEventListener('resize', this._onWindowResizeThrottled.bind(this, null));
            this.onWindowResize();
        }

        /**
         * Method that is being called, every time the window is being resized.
         * The windowWidth parameter was added to improve testability
         *
         * @param {number} [windowWidth] - current width of the window. Defaults to window.innerWidth
         */

    }, {
        key: 'onWindowResize',
        value: function onWindowResize(windowWidth) {
            windowWidth = windowWidth || window.innerWidth;

            if (windowWidth < this.settings.threshold) {
                // mobile
                this.hideMap();
            } else {
                // desktop
                this.showMap();
            }
        }
    }, {
        key: 'showMap',
        value: function showMap() {
            this.$mapContainer.css({
                position: '',
                left: ''
            });
        }
    }, {
        key: 'hideMap',
        value: function hideMap() {
            this.$mapContainer.css({
                position: 'absolute',
                left: '-9999px'
            });
        }

        /**
         * Checks whether or not the map is currently being displayed.
         * @return {boolean}
         */

    }, {
        key: 'isMapShown',
        value: function isMapShown() {
            return this.$mapContainer.offset().left > -9000;
        }
    }, {
        key: 'onMapMove',
        value: function onMapMove() {}
    }, {
        key: 'onMarkerClick',
        value: function onMarkerClick() {}
    }, {
        key: 'preprocess',
        value: function preprocess() {}
    }]);

    return HideMapOnMobileController;
}();

LocationManagerControllerFactory.register('hideMapOnMobile', HideMapOnMobileController);
;;
/**
 * Implements the InfoWindow popup
 *
 * @implements LocationManagerControllerInterface
 */

var InfoWindowController = function () {

    /**
     * @param {InfoWindowController~settings} settings
     */


    /**
     * @type {LocationManager}
     */


    /**
     * @type {google.maps.InfoWindow}
     */
    function InfoWindowController(settings) {
        _classCallCheck(this, InfoWindowController);

        settings = settings || {};
        settings.selector = settings.selector || '.location-manager__location__info-window';

        this.settings = settings;
    }

    /**
     * @param {LocationManager} locationManager
     */


    /**
     * @type {LocationManager~marker}
     */


    /**
     * @type {InfoWindowController~settings}
     */


    _createClass(InfoWindowController, [{
        key: 'init',
        value: function init(locationManager) {
            this.locationManager = locationManager;

            // initialize infowindow
            this.infoWindow = new google.maps.InfoWindow({ content: '' });
            this.infoWindow.addListener('closeclick', this.onInfoWindowClose.bind(this));
        }

        /**
         * @param {LocationManager~marker} marker
         * @param {boolean} doNotFilterList
         */

    }, {
        key: 'onMarkerClick',
        value: function onMarkerClick(marker, doNotFilterList) {
            this.addCurrentMarkerToClusterer();

            this.locationManager._markerClusterer.removeMarker(marker.marker);
            marker.marker.setMap(this.locationManager.map);
            this.currentMarker = marker;

            if (this.locationManager.map.getZoom() < 10) {
                this.locationManager.map.setZoom(10);
            }
            this.locationManager.map.panTo(marker.marker.getPosition());
            this.infoWindow.setContent(marker.element.querySelector(this.settings.selector).innerHTML);
            this.infoWindow.open(this.locationManager.map, marker.marker);

            if (!doNotFilterList) {
                this.locationManager.marker.forEach(function (marker) {
                    marker.showInList = false;
                });
                marker.showInList = true;
                this.locationManager.updateList();
            }
        }

        /**
         * Callback that is executed, when the InfoWindow is closed.
         */

    }, {
        key: 'onInfoWindowClose',
        value: function onInfoWindowClose() {
            this.addCurrentMarkerToClusterer();
        }
    }, {
        key: 'addCurrentMarkerToClusterer',
        value: function addCurrentMarkerToClusterer() {
            if (!this.currentMarker) {
                return;
            }
            this.locationManager._markerClusterer.addMarker(this.currentMarker.marker);
            this.currentMarker = null;
        }
    }, {
        key: 'onMapMove',
        value: function onMapMove() {}
    }, {
        key: 'preprocess',
        value: function preprocess() {}
    }]);

    return InfoWindowController;
}();

LocationManagerControllerFactory.register('infoWindow', InfoWindowController);
;;
/**
 * Hides locations in the list that are not inside of the current map bounds
 *
 * @implements {LocationManagerControllerInterface}
 */

var RefreshListOnMoveController = function () {

    /**
     * @param {RefreshListOnMoveController~settings} settings
     */
    function RefreshListOnMoveController(settings) {
        _classCallCheck(this, RefreshListOnMoveController);

        settings = settings || {};
        settings.throttle = settings.throttle || 250;

        this._hideInListDebounced = EventHelpers.throttle(this.hideInList, settings.throttle, this);
    }

    /**
     * @param {LocationManager} locationManager
     */


    _createClass(RefreshListOnMoveController, [{
        key: 'init',
        value: function init(locationManager) {
            this._locationManager = locationManager;
        }
    }, {
        key: 'onMarkerClick',
        value: function onMarkerClick() {}
    }, {
        key: 'preprocess',
        value: function preprocess() {}
    }, {
        key: 'onMapMove',
        value: function onMapMove() {
            this._hideInListDebounced();
        }

        /**
         * @type {LocationManager}
         */


        /**
         * Throttled version of {@link RefreshListOnMoveController#hideInList}
         * @type {Function}
         * @private
         */

    }, {
        key: 'hideInList',


        /**
         * Hides the elements in the list that are outside of the bounds
         */
        value: function hideInList() {
            var bounds = this._locationManager.map.getBounds();
            this._locationManager.marker.forEach(function (marker) {
                marker.showInList = marker.showOnMap && bounds.contains(marker.marker.getPosition());
            });
            this._locationManager.updateList();
        }
    }]);

    return RefreshListOnMoveController;
}();

LocationManagerControllerFactory.register('refreshListOnMove', RefreshListOnMoveController);
;;
/**
 * Zooms to a marker whenever the showlink is being clicked.
 * Also opens the infowindow, if the infowindow controller is being used
 *
 * @implements LocationManagerControllerInterface
 */

var ShowOnClickController = function () {

    /**
     * @param {ShowOnClickController~settings} settings
     */
    function ShowOnClickController(settings) {
        _classCallCheck(this, ShowOnClickController);

        settings = settings || {};
        settings.linkSelector = settings.linkSelector || '.location-manager__location__show';
        this.settings = settings;
    }

    /**
     * Initializes the handlers
     *
     * @param {LocationManager} locationManager
     */


    /**
     * @type {ShowOnClickController~settings}
     */


    _createClass(ShowOnClickController, [{
        key: 'init',
        value: function init(locationManager) {
            var _this9 = this;

            locationManager.marker.forEach(function (marker) {
                var links = marker.element.querySelectorAll(_this9.settings.linkSelector);
                for (var i = 0; i < links.length; i++) {
                    links[i].addEventListener('click', _this9.onShowLinkClick.bind(_this9, marker, locationManager));
                }
            });
        }
    }, {
        key: 'onMapMove',
        value: function onMapMove() {}
    }, {
        key: 'onMarkerClick',
        value: function onMarkerClick() {}

        /**
         * Method that is executed whenever the show link on an element is being clicked
         *
         * @param {LocationManager~marker} marker
         * @param {LocationManager} locationManager
         * @private
         */

    }, {
        key: 'onShowLinkClick',
        value: function onShowLinkClick(marker, locationManager) {
            locationManager._settings.mapContainer.scrollIntoView(true);

            /** @var {InfoWindowController} */
            var infoWindowController = locationManager.getController(InfoWindowController);
            if (infoWindowController) {
                // let infoWindowController handle the zooming and panning, if it is available
                infoWindowController.onMarkerClick(marker, true);
            } else {
                // zoom and pan manually if it is not available (fallback)
                locationManager.map.setCenter(marker.marker.getPosition());
                locationManager.map.setZoom(10);
            }
        }
    }, {
        key: 'preprocess',
        value: function preprocess() {}
    }]);

    return ShowOnClickController;
}();

LocationManagerControllerFactory.register('showOnClick', ShowOnClickController);
;;
/**
 * Zooms to a marker whenever the showlink is being clicked
 *
 * @implements LocationManagerControllerInterface
 */

var SortByDistanceController = function () {

    /**
     * @param {SortByDistanceController~settings} settings
     */


    /**
     * @type {SortByDistanceController~settings}
     */
    function SortByDistanceController(settings) {
        _classCallCheck(this, SortByDistanceController);

        settings = settings || {};
        settings.throttle = settings.throttle || 500;

        this._sortMarkersThrottled = EventHelpers.throttle(this.sortMarkers, settings.throttle, this);
        this.settings = settings;
    }

    /**
     * @type {LocationManager}
     */


    _createClass(SortByDistanceController, [{
        key: 'init',
        value: function init(locationManager) {
            this.locationManager = locationManager;
        }

        /**
         * Returns the distance between 2 latlngbounds
         * @param {google.maps.LatLng} a
         * @param {google.maps.LatLng} b
         * @return {number}
         */

    }, {
        key: 'getDistance',
        value: function getDistance(a, b) {
            return google.maps.geometry.spherical.computeDistanceBetween(a, b);
        }
    }, {
        key: 'sortMarkers',
        value: function sortMarkers() {
            var _this10 = this;

            var center = this.locationManager.map.getCenter();
            this.locationManager.marker.sort(function (a, b) {
                return _this10.getDistance(center, a.marker.getPosition()) - _this10.getDistance(center, b.marker.getPosition());
            });
        }
    }, {
        key: 'onMapMove',
        value: function onMapMove() {
            this._sortMarkersThrottled();
        }
    }, {
        key: 'onMarkerClick',
        value: function onMarkerClick() {}
    }, {
        key: 'preprocess',
        value: function preprocess() {}

        /**
         * @type {Function}
         */

    }]);

    return SortByDistanceController;
}();

LocationManagerControllerFactory.register('sortByDistance', SortByDistanceController);
;;
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

var TagFilterController = function () {

    /**
     * @param {TagFilterController~settings} settings
     */


    /**
     * @type {LocationManager}
     */


    /**
     * @type {TagFilterController~settings}
     */
    function TagFilterController(settings) {
        _classCallCheck(this, TagFilterController);

        this.tags = [];
        this.activeTags = [];

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


    /**
     * List of tags that are currently active
     * @type {TagFilterController~tag[]}
     */


    /**
     * @type {TagFilterController~tag[]};
     */


    _createClass(TagFilterController, [{
        key: 'init',
        value: function init(locationManager) {
            var _this11 = this;

            this.locationManager = locationManager;

            var tags = document.querySelectorAll(this.settings.items);
            for (var i = 0; i < tags.length; i++) {
                var tag = {
                    element: tags[i],
                    id: tags[i].getAttribute(this.settings.attribute),
                    name: tags[i].innerText
                };
                this.tags.push(tag);
                tag.element.addEventListener('click', this.onTagClick.bind(this, tag));
            }

            this.locationManager.marker.forEach(function (marker) {
                marker._tags = marker.element.getAttribute(_this11.settings.attribute).split(',');
                // prevent empty string
                if (!marker._tags[0]) {
                    marker._tags = [];
                }
            });

            var reset = document.querySelector(this.settings.reset);
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

    }, {
        key: 'onMapMove',
        value: function onMapMove() {
            this._hideTagsInListThrottled();
        }

        /**
         * Removes all active classes from the tag elements
         */

    }, {
        key: 'removeActiveClasses',
        value: function removeActiveClasses() {
            var _this12 = this;

            this.tags.forEach(function (tag) {
                tag.element.classList.remove(_this12.settings.activeClass);
            });
        }

        /**
         * Adds the active class for the given filter depending on the combination method
         * @param {TagFilterController~tag} tag
         */

    }, {
        key: 'addActiveClass',
        value: function addActiveClass(tag) {
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

    }, {
        key: 'resetFilter',
        value: function resetFilter() {
            this.activeTags = [];
            this.removeActiveClasses();
            this.locationManager.marker.forEach(function (marker) {
                marker.showInList = true;
                marker.showOnMap = true;
            });
            this.locationManager.updateList();
            this.locationManager.updateMap();
        }

        /**
         * @param {TagFilterController~tag} tag
         */

    }, {
        key: 'onTagClick',
        value: function onTagClick(tag) {
            var _this13 = this;

            if (this.activeTags.indexOf(tag) > -1) {
                // remove the tag, if it is already active
                this._removeTag(tag);
                return;
            }
            this.addActiveClass(tag);
            this.locationManager.marker.forEach(function (marker) {
                _this13._changeMarkerState(marker, marker._tags.indexOf(tag.id) !== -1);
            });

            if (this.settings.combine === 'none') {
                this.activeTags = [tag];
            } else {
                this.activeTags.push(tag);
            }

            // reapply map filtering by RefreshListOnMoveController
            var refreshListOnMove = this.locationManager.getController(RefreshListOnMoveController);
            if (refreshListOnMove) {
                refreshListOnMove.hideInList();
            }

            this.locationManager.updateMap();
            this.locationManager.updateList();
        }

        /**
         * Updates the taglist that is currently displayed to the user:
         * Only shows the tags that currently have items inside of the bounds of the map
         */

    }, {
        key: 'updateTagsInList',
        value: function updateTagsInList() {
            var bounds = this.locationManager.map.getBounds();
            var visibleTags = [];

            this.locationManager.marker.forEach(function (marker) {
                if (!bounds.contains(marker.marker.getPosition())) {
                    return;
                }
                marker._tags.forEach(function (tag) {
                    if (visibleTags.indexOf(tag) === -1) {
                        visibleTags.push(tag);
                    }
                });
            });

            var areTagsDisplayed = false;
            this.tags.forEach(function (tag) {
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
    }, {
        key: '_removeTag',
        value: function _removeTag(tag) {
            var _this14 = this;

            this.activeTags.splice(this.activeTags.indexOf(tag), 1);
            var tags = this.activeTags;
            this.resetFilter();
            tags.forEach(function (tag) {
                _this14.onTagClick(tag);
            });
        }

        /**
         * Changes the marker display state depending on the combination method that was
         * passed in the settings ("AND", "OR", 'none')
         * @param {LocationManager~marker} marker
         * @param {boolean} state
         * @private
         */

    }, {
        key: '_changeMarkerState',
        value: function _changeMarkerState(marker, state) {
            // if this is the first filter that is being applied, then simply apply it without additional logic
            if (this.activeTags.length === 0) {
                marker.showOnMap = marker.showInList = state;
                return;
            }

            switch (this.settings.combine) {
                case 'AND':
                    marker.showOnMap = marker.showOnMap && state;
                    marker.showInList = marker.showInList && state;
                    break;
                case 'OR':
                    marker.showOnMap = marker.showOnMap || state;
                    marker.showInList = marker.showInList || state;
                    break;
                case 'none':
                default:
                    marker.showOnMap = marker.showInList = state;
                    break;
            }
        }
    }, {
        key: 'onMarkerClick',
        value: function onMarkerClick() {}
    }, {
        key: 'preprocess',
        value: function preprocess() {}

        /**
         * @type {Function}
         */

    }]);

    return TagFilterController;
}();

LocationManagerControllerFactory.register('tagFilter', TagFilterController);
