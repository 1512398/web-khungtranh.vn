function executeSearch(page,templateLink) {
    var fromDate = $('#fromDate').val();
    var toDate = $('#toDate').val();
    var fromPrice = $('#fromPrice').val();
    var toPrice = $('#toPrice').val();
    var searchQuery = $('#search').val();
    var CatalogId = $('#catalogSelect').val();
    var sortBy = $('#sortBy').val();
    $.ajax({
        url: '/SanPham/catalog',
        type: 'GET',
        data: {
            page:page,
            CatalogId: CatalogId,
            fromDate: fromDate,
            toDate: toDate,
            fromPrice: fromPrice,
            toPrice: toPrice,
            searchString: searchQuery,
            sortBy: sortBy
        },
        success: function (data) {
            cur_page = page;
           
            $('#countRows').text('Có tổng cộng '+data.itemsList.count+' sản phẩm được tìm thấy');
            if (num_of_pages != data.pagination.num_of_pages) {
                num_of_pages = data.pagination.num_of_pages;
                if (num_of_pages == 0) {
                    $('#noItem').css('display', 'inline');
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
                            executeSearch(page,templateLink)
                        }
                    });
                }
            }
            item_info = data;
            // template='/templates/catalog_items_row.hbs'
            getTemplateAjax(templateLink, '#items', data)
        }
    })
}

