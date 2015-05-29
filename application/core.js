(function () {
    var core = {
        inherits: function (ctor, superCtor) {
            ctor.super_ = superCtor;
            ctor.prototype = Object.create(superCtor.prototype, {
                constructor: {
                    value: ctor,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
        }
        /**
         * Extends constructor
         * @param ctor - Extendable constructor
         * @param superCtor - Extending constructor
         */
        , extend: function (ctor, superCtor) {
            var keys = Object.keys(superCtor.prototype);
            var i = keys.length;
            while (i--) {
                if (!ctor.prototype[keys[i]])
                    ctor.prototype[keys[i]] = superCtor.prototype[keys[i]];
            }
            if (!ctor.exts_) {
                ctor.exts_ = {};
            }
            ctor.exts_[superCtor.prototype['__class_name']] = superCtor.prototype;
        }

        /**
         * Creates and returns namespace
         * @param {string} ns_name - Namespace name
         * @returns {Object}
         */
        , namespace: function (ns_name) {
            var parts = ns_name.split(".");
            var ns = self[parts[0]] = self[parts[0]] || {};
            for (var i = 1; i < parts.length; i++) {
                var p = parts[i];
                ns = ns[p] = ns[p] || {};
            }
            return ns;
        }
    };
    core.namespace('app');
    app.core = core;
})();