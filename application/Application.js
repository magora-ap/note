function Application(options) {

    this._options = {
        formName: 'note-form',
        storage: 'Cookie',
        view: {
            containerId: 'notes',
            formContainerId: 'note-form',
            templateId: 'note-template',
            errorTemplateId: 'form-error-template',
            formItemTemplateId: 'form-item-template',
            formItemInputTemplateId: 'form-item-input-template',
            formItemTextareaTemplateId: 'form-item-textarea-template'
        }
    };

    this._forms = {
        'note-form': {
            onsubmit: function (e) {
                e.preventDefault();
                if (application._save())
                    this.reset();
            },
            validateCallback: function (element, errors) {
                this._view.toggleErrors(element, errors);
            }.bind(this),
            templateId: 'form-template',
            fields: [
                {
                    element: 'input',
                    templateId: 'form-input-template',
                    name: 'title',
                    placeholder: 'Enter title',
                    type: 'text',
                    label: 'Title',
                    validators: [
                        {method: 'required', error: 'The field \'Title\' is required'},
                        {method: 'number', error: 'Only numbers are allowed in field \'Title\''}
                    ]
                },
                {
                    element: 'textarea',
                    templateId: 'form-textarea-template',
                    name: 'content',
                    label: 'Content',
                    validators: [
                        {method: 'required', error: 'The field \'Content\' is required'},
                        {method: 'number', error: 'Only numbers are allowed in field \'Content\''}
                    ]
                },
                {
                    element: 'button',
                    templateId: 'form-button-template',
                    type: 'submit'
                }
            ]
        }
    };

    this._container = null;
    this._form = null;
    this._storage = null;
    this._view = null;

    var application = this;

    this.init = function () {
        this._view = new View(this._options.view);
        this._storage = new AppStorage(this._options.storage);


        this._view.afterRender = function () {
            application._form = document.getElementById('note-form');
            application._container = document.getElementById(application._options.view.containerId);

            var elements = application._container.getElementsByClassName('action-note');
            for (var i = 0; i < elements.length; i++) {
                elements[i].onclick = function () {
                    var action = this.attributes['data-action'].value;
                    application[action](this.attributes['data-id'].value);
                }
            }
        };

        this._render(true);
    };

    this._render = function (init) {
        this._view.render(init, this._storage.getAll(), this._forms);
    };

    this.edit = function (id) {
        var obj = this._storage.get(id);
        for (var key in obj) {
            if (!obj.hasOwnProperty(key)) {
                continue;
            }

            this._form.elements[key].value = obj[key];
        }
    };

    this.remove = function (id) {
        this._storage.remove(id);
        this._render();
    };

    this.mergeObjects = function (obj1, obj2) {
        for (var p in obj2) {
            if (!obj2.hasOwnProperty(p)) {
                continue;
            }
            try {
                if (obj2[p].constructor == Object) {
                    obj1[p] = this.mergeObjects(obj1[p], obj2[p]);
                } else {
                    obj1[p] = obj2[p];
                }
            } catch (e) {
                obj1[p] = obj2[p];
            }
        }
        return obj1;
    };

    this._save = function () {

        var valid = true;
        for (var i = 0; i < this._form.elements.length; i++) {
            var element = this._form.elements[i];
            if (element.validator) {
                if (!element.validator.test()) {
                    valid = false;
                }
            }
        }

        if (!valid)
            return false;

        this._storage.set({
            id: this._form.elements['id'].value,
            title: this._form.elements['title'].value,
            content: this._form.elements['content'].value
        });

        application._render();

        return true;
    };

    if (options !== undefined) {
        this._options = this.mergeObjects(this._options, options)
    }
}
jQuery(function ($) {
    var app = new Application();
    app.init();
});