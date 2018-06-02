function getTemplateAjax(path, target, jsonData) {
    var source;
    var template;
    $.ajax({
        url: path,
        cache: false,
        success: function (data) {
            source = data;
            template = Handlebars.compile(source);
            $(target).html(template(jsonData));
        }
    })
}