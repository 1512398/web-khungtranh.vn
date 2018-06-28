var express = require('express');
var router = express.Router();

var catalogController = require('../controllers/catalogController');

router.get('/', function (req, res) {
    catalogController.getAll(function (catalog) {
        console.log(catalog[3].title);
        console.log(catalog[3].Items.length)
        res.render('dathang',{member: req.isAuthenticated(),name:'dathang', title:'Đặt Hàng',catalog:catalog});
      })
})

module.exports = router;
