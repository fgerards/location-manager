describe('EventHelpers', function() {

    describe('throttle', function() {

        it ('should only execute every x ms', function(done) {

            var callCount = 0;
            function callback() {
                callCount++;
            }

            // method is throttled to once every 100ms and is called
            // every 20ms for 350ms. thus, the method should be called 3 times
            // (at 100ms, at 200ms and at 300ms). It is NOT called at 0ms because at
            // that point it is still waiting for new events to come in
            // @see it('should delay the first call')
            var interval = setInterval(EventHelpers.throttle(callback, 100), 20);
            setTimeout(function() {
                clearInterval(interval);
                assert.isAtMost(callCount, 4);
                done();
            }, 350);
        });

        it ('should pass the context', function(done) {
            var test = { test: 'test' };
            function callback() {
                assert.equal(this, test);
                done();
            }
            EventHelpers.throttle(callback, 100, test)();
        });

        it ('should delay the first call', function(done) {
            var callCount = 0;
            function callback() { callCount++; done(); }

            EventHelpers.throttle(callback, 200)();
            assert.equal(callCount, 0);
        })
    });


    describe ('debounce', function() {

        it ('should only execute once after a storm of events', function(done) {

            var callCount = 0;
            function callback() {
                callCount++;
            }

            var interval = setInterval(EventHelpers.debounce(callback, 100), 20);
            setTimeout(function() {
                clearInterval(interval);
                setTimeout(function() {
                    assert.equal(callCount, 1);
                    done();
                }, 150);
            }, 200);
        });

        it ('should pass the context', function(done) {
            var test = { test: 'test' };
            function callback() {
                assert.equal(this, test);
                done();
            }
            EventHelpers.debounce(callback, 100, test)();
        });

        it ('should delay the first call', function(done) {
            var callCount = 0;
            function callback() { callCount++; done(); }

            EventHelpers.debounce(callback, 200)();
            assert.equal(callCount, 0);
        });

    })

});