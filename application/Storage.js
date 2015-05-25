function AppStorage(storage) {
    this._key = 'storage';
    this._storage = new window[storage]();

    this.getAll = function () {
        return this._storage.get(this._key) ? JSON.parse(this._storage.get(this._key)) : {};
    };

    this._generateId = function () {
        return 'id-' + Object.keys(this.getAll()).length;
    };

    this._saveStorage = function (storage) {
        this._storage.set(this._key, JSON.stringify(storage));
        return this;
    };

    this.get = function (key) {
        return this.getAll()[key]
    };

    this.set = function (obj) {

        obj.id = obj.id.length ? obj.id : this._generateId();

        var storage = this.getAll();
        storage[obj.id] = obj;

        return this._saveStorage(storage);
    };

    this.remove = function (key) {
        var storage = this.getAll();
        delete storage[key];

        return this._saveStorage(storage);
    }
}