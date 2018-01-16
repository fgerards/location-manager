export function applyObjectDefaults(object, defaults) {

    Object.keys(defaults).forEach(key => {
        if (object[key] === undefined) {
            object[key] = defaults[key];
        } else if (typeof object[key] === 'object' && typeof defaults[key] === 'object') {
            object[key] = applyObjectDefaults(object[key], defaults[key]);
        }
    });

    return object;
}