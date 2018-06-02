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
=======
var express = require('express');
var router = express.Router();

var catalogController = require('../controllers/catalogController');
var listItems = require('../controllers/cart_itemController');

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


function Cart(_this) {
    this.items = _this.items || {}
    this.countAll = _this.countAll || 0
    this.priceAll = _this.priceAll || 0
    this.add = (item, id) => { 
        var listItem = this.items[id]
        if(!listItem) {
            listItem = this.items[id] = {
                item: item, 
                count: 0,
                price: 0
            }
        }
        listItem.count += 1
        listItem.price = listItem.item.itemPrice * listItem.count
        this.countAll += 1
        this.priceAll += listItem.item.itemPrice
    }
    this.delete = (item, id) => {
        var listItem = this.items[id]
        if(listItem){
            if(listItem.count >= 1) {
                listItem.count -= 1
                listItem.price = listItem.item.itemPrice * listItem.count
                this.countAll -= 1
                this.priceAll -= listItem.item.itemPrice
            }
        }
    }
    this.generate = (somethings) => {
        var res = [];
        this.items.forEach(element => {
            arr.push(element);
        });
        return arr;
    }
}

router.get('/add_cart_item', (req, res)=> {
    var sessionCart = req.session;
    let cartItem = new Cart(sessionCart.cart? sessionCart.cart:{})
    listItems.getbyId(req.query.id, (item)=>{
        cartItem.add(item, item.id)
        sessionCart.cart = cartItem;
        console.log(sessionCart)
        res.send('/')
    })
})
router.get('/delete_cart_item', (req, res)=> {
    var sessionCart = req.session;
    let cartItem = new Cart(sessionCart.cart? sessionCart.cart:{})
    listItems.getbyId(req.query.id, (item)=>{
        cartItem.delete(item, item.id)
        sessionCart.cart = cartItem;
        console.log(sessionCart)
        res.send('/')
    })
})
module.exports = router;
