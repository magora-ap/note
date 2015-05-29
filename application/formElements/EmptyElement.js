/**
 * Created by akulov on 27.05.2015.
 */
function EmptyElement(id, fieldDescr) {
    this.label = function (text) {
        return this;
    };

    this.validator = function () {
        return this;
    };

    this.toString = function () {
        return '';
    };
}
