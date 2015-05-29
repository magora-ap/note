var VALIDATORS = VALIDATORS || [];

VALIDATORS['number'] = function (text) {
    return /^[0-9]+$/.test(text);
}