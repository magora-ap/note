function Form(name, options) {
    app.core.namespace("notes.formElements");

    this._options = {
        templateId: options.templateId,
        name: name,
        id: options.id || name,
        inputIdPrefix: options.inputPrefix || 'form-gen-',
        inputIdPostfix: options.inputPostfix || '',
        fields: options.fields || [],
        onsubmit: options.onsubmit || null,
        validateCallback: options.validateCallback
    }

    this._formTemplate = document.getElementById(this._options.templateId).innerHTML;
    this._element = null;

    this._generateId = function (index) {
        return this._options.inputIdPrefix + index;
    };

    this._createField = function (id, fieldDescr) {
        var type = fieldDescr.element.charAt(0).toUpperCase() + fieldDescr.element.substr(1);

        var field = (notes.formElements[type] !== undefined) ? new notes.formElements[type](id, fieldDescr) : new EmptyElement(id, fieldDescr);

        if (fieldDescr.label) {
            field.label(fieldDescr.label);
        }

        if (fieldDescr.validators) {
            field.validator(new Validator(this._options.validateCallback.bind(this), fieldDescr.validators));
        }

        return '<div class="form-group" data-id="' + id + '">' + field + '</div>';
    };

    this.attachSubmit = function (element) {
        this._element.addEventListener('submit', this._options.onsubmit);
    }

    this.detachSubmit = function (element) {
        this._element.removeEventListener('submit', this._options.onsubmit);
    }

    this.render = function () {
        var html = this._formTemplate.replace(/{{(\w+)}}/ig, function (pattern, key) {
            if (key == 'fields') {
                var fieldsHtml = '';
                for (var i = 0; i < this._options.fields.length; i++) {
                    fieldsHtml += this._createField(this._generateId(i), this._options.fields[i]);
                }

                return fieldsHtml;
            }
            else {
                return this._options[key];
            }
        }.bind(this));

        if (typeof this._options.onsubmit == 'function') {
            var self = this;

            function watchForAttach() {
                var el;
                if (!(el = document.getElementById(self._options.id))) {
                    setTimeout(watchForAttach, 1);
                    return;
                }

                self._element = el;
                self.attachSubmit();
            }

            watchForAttach();
        }

        return html;
    }
}
