/**
 * Created by akulov on 27.05.2015.
 */
(function () {
    app.core.namespace("notes.formElements");

    notes.formElements.Button = function (id, options) {
        notes.formElements.BaseElement.call(this, id, options);
    };

    app.core.inherits(notes.formElements.Button, notes.formElements.BaseElement);

    notes.formElements.Button.prototype.label = function () {
        return this;
    };

    notes.formElements.Button.prototype.validator = function () {
        return this;
    };
})();
