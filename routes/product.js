var express = require('express');
var router = express.Router();

var catalogController = require('../controllers/catalogController');

router.get('/', function(req,res){
    catalogController.getAll(function(catalog){
        res.render('SanPham',{catalogs:catalog, title:'Sản phẩm', name:'sanpham',member: req.isAuthenticated()});
    })
});

router.get('/catalog', function (req, res) {
    console.log(req.query)
    //catalogController.getById(req.params.id,page,function(article){
    var limit = 5;
    var page = parseInt(req.query.page);
    page = isNaN(page) ? 1 : page;
    var offset = Math.max(0,(page-1)*limit);
    var searchQuery = {};
    searchQuery.CatalogId = req.query.CatalogId;
    searchQuery.fromPrice = req.query.fromPrice;
    searchQuery.toPrice = req.query.toPrice;
    searchQuery.fromDate = req.query.fromDate;
    searchQuery.toDate = req.query.toDate;
    searchQuery.sortBy = req.query.sortBy;
    searchQuery.findString= req.query.searchString;
    console.log('search query: ',searchQuery);
    itemController.search(searchQuery,limit,offset,function(items){
        res.json({
            itemsList: items,
            pagination:{
                num_of_pages: Math.ceil(items.count/limit),
                limit:limit
            }});
    })
})
itemController = require('../controllers/itemController');
router.get('/search',function (req,res){
    var searchQuery = {};
    // searchQuery.CatalogId = 4;
    // searchQuery.fromPrice = 2300;
    // searchQuery.fromDate = '06/01/2018'
    // searchQuery.toDate = '06/01/2018'
    // searchQuery.findString= 'hieu hoang'
    // searchQuery.toPrice = 140000;
    itemController.search(searchQuery,function(items){
        res.json(items);
    })
});
module.exports = router;