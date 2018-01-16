/**
 * @description in case of a "storm of events", this executes once every $threshold
 * @summary
 * Returns a function that is executed at most every x milliseconds.
 * If it is called more often, then the calls are ignored.
 *
 * This is usefull, when binding methods to events that can fire very often
 * (e.g. `scroll` or `mousemove`).
 *
 * To aim for a FPS of 60, set the threshold to 16ms.
 *
 * NOTE: When using this method for performance improvements when animating,
 *       consider using `requestAnimationFrame` instead.
 *
 * @example
 * import { throttle } from '@nimius/event-utility'
 *
 * // Update the position at most every 16ms
 * container.addEventListener('mousemove', throttle(
 *    () => updatePosition(),
 *    16
 * ));
 *
 * @example
 * import { throttle } from '@nimius/event-utility'
 *
 * // Do not fetch new articles on every event
 * window.addEventListener('scroll', throttle(
 *    () => fetchMoreArticles(),
 *    500
 * ));
 *
 * @param {Function} func - The function that should be throttled.
 * @param {number} threshhold - Number of milliseconds at which execution of the
 *        function should be capped.
 * @returns {Function}
 */
export function throttle(func, threshhold) {
    threshhold || (threshhold = 250);
    let last,
        deferTimer;
    return function () {
        const now = +new Date,
            args = arguments;
        if (last && now < last + threshhold) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = now;
                func.apply(null, args);
            }, threshhold);
        } else {
            last = now;
            func.apply(null, args);
        }
    };
}