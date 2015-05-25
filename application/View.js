function View(options) {

    this.itemTemplate = document.getElementById(options.templateId).innerHTML;

    this.renderItem = function (item) {
        return this.itemTemplate.replace(/{{(.*?)}}/ig, function(pattern, key){
            return item[key];
        });
    };

    this.render = function (items) {

        var html = '';

        for (var item in items) {
            if (!items.hasOwnProperty(item)) {
                continue;
            }

            html += this.renderItem(items[item]);
        }

        document.getElementById(options.containerId).innerHTML = html;

        this.afterRender();
    };

    this.afterRender = function(){
    }
}