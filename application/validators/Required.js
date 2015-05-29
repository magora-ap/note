var VALIDATORS = VALIDATORS || [];

VALIDATORS['required'] = function (text) {
    return /^.+$/.test(text);
}