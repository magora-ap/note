function Application(options) {

    this._options = {
        formName: 'note-form',
        storage: 'Cookie',
        view: {
            containerId: 'notes',
            templateId: 'note-template'
        }
    };

    this._container = null;
    this._form = null;
    this._storage = null;
    this._view = null;

    var application = this;

    this.init = function () {
        this._container = document.getElementById(this._options.view.containerId);
        this._form = document.forms[this._options.formName];

        this._view = new View(this._options.view);
        this._storage = new AppStorage(this._options.storage);


        this._view.afterRender = function () {
            var elements = application._container.getElementsByClassName('action-note');
            for (var i = 0; i < elements.length; i++) {
                elements[i].onclick = function () {
                    var action = this.attributes['data-action'].value;
                    application[action](this.attributes['data-id'].value);
                }
            }
        };

        this._render();


        this._form.onsubmit = function (e) {
            e.preventDefault();
            application._save();
            this.reset();
        }
    };

    this._render = function () {
        this._view.render(this._storage.getAll());
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

        this._storage.set({
            id: this._form.elements['id'].value,
            title: this._form.elements['title'].value,
            content: this._form.elements['content'].value
        });

        application._render();

    };

    if (options !== undefined) {
        this._options = this.mergeObjects(this._options, options)
    }
}
jQuery(function ($) {
    var app = new Application();
    app.init();
});