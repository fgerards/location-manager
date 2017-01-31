describe('TagFilterController', function() {
    this.timeout(6000);

    /**
     * @type {LocationManager}
     */
    var locationManager;

    /**
     * @type {TagFilterController}
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

        controller = new TagFilterController({
            container: '#tags',
            items: '#tags .tag',
            reset: '#tagReset',
            attribute: 'data-tags',
            throttle: 0
        });
        locationManager.addController(controller);
    });


    it ('should extract all of the tags into the tags object', function() {
        assert.equal(controller.tags[0].id, '1');
        assert.equal(controller.tags[3].id, '4');
        assert.equal(controller.tags[0].name, 'TAG 1');
        assert.equal(controller.tags[3].name, 'TAG 4');
    });

    it ('should filter the map & list when clicking on a tag', function() {
        var index = Math.floor(Math.random() * controller.tags.length);
        var tag = controller.tags[index];

        controller.onTagClick(tag);

        locationManager.marker.forEach(function(marker) {
            assert.equal(marker.element.getAttribute('data-tags').indexOf(tag.id) > -1, marker.showInList);
            assert.equal(marker.element.getAttribute('data-tags').indexOf(tag.id) > -1, marker.showOnMap);
        });
    });



    it ('should disable a filter, if clicked again', function() {
        var index = Math.floor(Math.random() * controller.tags.length);
        var tag = controller.tags[index];

        controller.onTagClick(tag);
        assert.equal(controller.activeTags.length, 1);
        controller.onTagClick(tag);
        assert.equal(controller.activeTags.length, 0);

        locationManager.marker.forEach(function(marker) {
            assert.isTrue(marker.showInList);
            assert.isTrue(marker.showOnMap);
        })
    });

    it ('should update the list & map after filtering', function() {
        var index = Math.floor(Math.random() * controller.tags.length);
        var tag = controller.tags[index];

        sinon.spy(locationManager, 'updateMap');
        sinon.spy(locationManager, 'updateList');

        controller.onTagClick(tag);

        assert.isTrue(locationManager.updateMap.called);
        assert.isTrue(locationManager.updateList.called);

        locationManager.updateList.restore();
        locationManager.updateMap.restore();
    });

    it ('should filter the tags', function(done) {
        // zoom level 1: everything should be shown
        locationManager.map.setZoom(1);

        setTimeout(function(){
            controller.updateTagsInList();
            var count = 0;
            $('#tags .tag').each(function() {
                if ($(this).css('display') !== 'none') {
                    count++;
                }
            });
            assert.equal(count, 4);

            // zoom level 12 on a specific marker: only those should be visible
            var index = Math.floor(Math.random() * locationManager.marker.length);
            var marker = locationManager.marker[index];
            var tags = marker.element.getAttribute('data-tags').split(',');

            locationManager.map.setCenter(marker.marker.getPosition());
            locationManager.map.setZoom(12);
            setTimeout(function() {
                controller.updateTagsInList();

                controller.tags.forEach(function(tag) {
                    assert.equal(tags.indexOf(tag.id) > -1, $(tag.element).css('display') !== 'none')
                });
                done()
            }, 1500);
        }, 1500);
    });

    it ('should hide the container if no tags are visible', function(done) {
        // zoom to the pole
        locationManager.map.setCenter(new google.maps.LatLng(0,0));
        locationManager.map.setZoom(12);

        setTimeout(function() {
            controller.updateTagsInList();
            assert.equal($('#tags').css('display'), 'none');
            done();
        }, 1500);

    });

    it ('should reset the filter correctly', function() {
        var index = Math.floor(Math.random() * controller.tags.length);
        var tag = controller.tags[index];

        controller.onTagClick(tag);
        controller.resetFilter();

        locationManager.marker.forEach(function(marker) {
            assert.isTrue(marker.showInList);
            assert.isTrue(marker.showOnMap);
        })
    });

    it ('should initially hide the container, if no marker with filters are available', function(done) {
        // remove all tags
        $('li.location').attr('data-tags', '');

        // clear old tags cache to simulate fresh initialization
        controller.tags = [];

        // reregister
        setTimeout(function() {
            locationManager.addController(controller);
            assert.equal($('#tags').css('display'), 'none');
            done();
        }, 1500);
    });

    it ('should initially hide the container, if no filters are available', function(done) {
        // remove all tags
        $('#tags .tag').remove();

        // clear old tags cache to simulate fresh initialization
        controller.tags = [];

        // reregister
        setTimeout(function() {
            locationManager.addController(controller);
            assert.equal($('#tags').css('display'), 'none');
            done();
        }, 1500);

    });
});