/**
 * Created by akulov on 27.05.2015.
 */
(function () {
    app.core.namespace("notes.formElements");

    notes.formElements.BaseElement = function (id, options) {
        this._id = id;
        this._options = options;
        this._templateId = options.templateId || 'form-element-template';
        this._labelTemplateId = options.labelTemplateId || 'form-label-template';
        this._element = null;
        this._template = document.getElementById(this._templateId).innerHTML;

        this._template = this._template.replace(/{{(id)}}/ig, this._id);
        this._template = this._template.replace(/{{(\w+)}}/ig, function (pattern, key) {
            return this._options[key] || '';
        }.bind(this));
    }

    notes.formElements.BaseElement.prototype.label = function () {
        var labelTemplate = document.getElementById(this._labelTemplateId).innerHTML;

        labelTemplate = labelTemplate.replace(/{{(id)}}/ig, this._id);
        labelTemplate = labelTemplate.replace(/{{(label)}}/ig, this._options.label);

        this._template = labelTemplate + this._template; // TODO: there should be new line symbol for proper display
        return this;
    };

    notes.formElements.BaseElement.prototype.validator = function (validator) {
        var self = this;

        function watchForAttach() {
            var el;
            if (!(el = document.getElementById(self._id))) {
                setTimeout(watchForAttach, 1);
                return;
            }

            self._element = el;
            self._element.validator = validator;
            validator.attach(self._element);
        }

        watchForAttach();
        return this;
    };

    notes.formElements.BaseElement.prototype.toString = function () {
        return this._template;
    };
})();

