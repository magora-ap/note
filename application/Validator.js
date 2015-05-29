var VALIDATORS = VALIDATORS || [];

function Validator(callback, validators) {
    this.validators = validators || [];
    this._callback = callback || function () {
        };

    function __handler__() {
        this.validator.test();
    }

    var self = this;
    this.test = function () {
        var value = this.value;
        var errors = [];
        for (var i = 0; i < self.validators.length; i++) {
            if (VALIDATORS[self.validators[i].method] && !VALIDATORS[self.validators[i].method](value))
                errors.push(self.validators[i].error);
        }

        self._callback(this, errors);

        return !errors.length;
    };

    this.attach = function (element) {
        element.addEventListener('keyup', __handler__);
        this.test = this.test.bind(element);
    };

    this.detach = function (element) {
        element.removeEventListener('keyup', __handler__);
    };

    this.setCallback = function (callback) {
        this._callback = callback;
    }
}
