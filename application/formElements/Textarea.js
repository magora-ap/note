/**
 * Created by akulov on 27.05.2015.
 */
(function () {
    app.core.namespace("notes.formElements");

    notes.formElements.Textarea = function (id, options) {
        notes.formElements.BaseElement.call(this, id, options);
    };

    app.core.inherits(notes.formElements.Textarea, notes.formElements.BaseElement);
})();
