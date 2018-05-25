var express = require('express');
var router = express.Router();

var catalogController = require('../controllers/catalogController');


router.get('/', function (req, res) {
    //catalogController.getById(req.params.id,page,function(article){
    catalogController.getById(4, function (catalog) {
        var limit = 5;
        // res.render('Sanpham',{pagination: {
        //     limit: limit,
        //     page: page,       // The current page the user is on
        //     totalRows: 12  // The total number of available pages
        //   },
        //   itemslist:catalog})
        res.render('Sanpham',{itemslist: catalog});
        // console.log(catalog);
        
    });
})

module.exports = router;
