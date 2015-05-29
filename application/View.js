function View(options) {

    this.itemTemplate = document.getElementById(options.templateId).innerHTML;
    this.bodyTemplate = document.body.innerHTML;

    this.renderItem = function (item) {
        return this.itemTemplate.replace(/{{(.*?)}}/ig, function (pattern, key) {
            return item[key];
        });
    };

    this.toggleErrors = function (element, errors) {
        var group = document.querySelector('div[data-id="' + element.id + '"]');
        var submitButton = element.form.querySelector('button[type="submit"]');
        var errorsList = document.getElementById('errors-list');
        var errorTemplate = document.getElementById(options.errorTemplateId).innerHTML;
        var errorNodes = '';

        for (var i = 0; i < errorsList.childNodes.length; i++) {
            if (errorsList.childNodes[i].nodeName != '#text' && errorsList.childNodes[i].getAttribute('data-id') != element.id) {
                errorNodes += errorsList.childNodes[i].outerHTML;
            }
        }

        if (errors.length) {
            if (!~group.className.indexOf('has-error'))
                group.className += ' has-error';

            if (!~submitButton.className.indexOf('disabled'))
                submitButton.className += ' disabled';

            for (var i = 0; i < errors.length; i++) {
                errorNodes += errorTemplate.replace('{{error}}', errors[i]).replace('{{id}}', element.id);
            }
        }
        else {
            group.className = group.className.replace('has-error', '');
            submitButton.className = submitButton.className.replace('disabled', '');
        }

        errorsList.innerHTML = errorNodes;
    };

    this.render = function (init, items, forms) {

        var html = '';

        var parameters = {
            "Item": items,
            "Form": forms
        };

        if (init) {
            document.body.innerHTML = this.bodyTemplate.replace(/{{(\w+):([\w|-]+)}}/ig, function (pattern, component, name) {
                if (window[component] !== undefined)
                    return (new window[component](name, parameters[component][name])).render();
                else
                    return '';
            });
        }

        for (var item in items) {
            if (!items.hasOwnProperty(item)) {
                continue;
            }

            html += this.renderItem(items[item]);
        }

        document.getElementById(options.containerId).innerHTML = html;

        this.afterRender();
    };

    this.afterRender = function () {
    }
}