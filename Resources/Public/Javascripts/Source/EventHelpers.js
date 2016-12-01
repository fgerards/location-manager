/**
 * General Event Helpers that are used all over the place
 * @constructor
 */
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
        var context = scope || this, args = arguments;
        var later = function () {
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
    var last,
        deferTimer;
    return function () {
        var context = scope || this;

        var now = +new Date,
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
