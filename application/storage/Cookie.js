function Cookie() {

    this._options = {};


    this.get = function (key) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };

    this.set = function (key, value, options) {

        var _options = this._options;

        if (options !== undefined) {
            _options = options;
        }

        var expires = _options.expires;
        var updatedCookie;

        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = _options.expires = d;
        }
        if (expires && expires.toUTCString) {
            _options.expires = expires.toUTCString();
        }

        value = encodeURIComponent(value);

        updatedCookie = key + "=" + value;

        for (var propName in _options) {
            if (!_options.hasOwnProperty(propName)) {
                continue;
            }
            updatedCookie += "; " + propName;
            var propValue = _options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }

        document.cookie = updatedCookie;
    };

    this.remove = function (key) {
        this.set(key, null, {expires: -1})
    };

}