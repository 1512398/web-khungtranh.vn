var express = require('express');
var router = express.Router();

var catalogController = require('../controllers/catalogController');

router.get('/', function(req,res){
    catalogController.getAll(function(catalog){
        res.render('SanPham',{catalogs:catalog, title:'Sản phẩm', name:'sanpham',member: req.isAuthenticated()});
    })
});

router.get('/catalog', function (req, res) {

    //catalogController.getById(req.params.id,page,function(article){
    var limit = 5;
    var page = parseInt(req.query.page);
    page = isNaN(page) ? 1 : page;
    var num_of_cmts = -1
    catalogController.countById(req.query.catalogId,function(catalog){
        countItems = catalog;
        catalogController.getById(req.query.catalogId, page, function (catalog) {
            res.json({itemslist: catalog, pagination: {
                num_of_pages:Math.ceil(countItems/limit),
                limit:limit
            }});
    
        });
    })
})


module.exports = router;
