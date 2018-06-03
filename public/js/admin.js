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
function handlePagination(num_of_pages){
    if (num_of_pages == 0){
                     $('#pagination-demo').twbsPagination('destroy');
                }
                else {
                     $('#pagination-demo').twbsPagination('destroy');
                $('#pagination-demo').twbsPagination({
                    totalPages: num_of_pages,
                    visiblePages: 3,
                    next: '>',
                    prev: '<',
                    onPageClick: function (event, page) {
                        loadItems(page)
                    }
                });   
                }
}