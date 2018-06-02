var express = require('express');
var router = express.Router();
var listItems = require('../controllers/cart_itemController');

require('async')
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
    this.generate = (somethings) => {
        var res = [];
        this.items.forEach(element => {
            arr.push(element);
        });
        return arr;
    }
}

router.get('/', async (req, res) => {
    var sessionCart = req.session;
    console.log(req.session)
    //init
    /*let cartItem = new Cart(sessionCart.cart? sessionCart.cart:{})
    listItems.getAll(async(items)=> {
        await items.forEach(e=> {
            cartItem.add(e, e.id)
            //console.log(cartItem)
        })
        sessionCart.cart = cartItem;
        console.log(req.session.cart.items)
        res.render('GioHang', {title: "Giỏ Hàng", items: req.session.cart.items, countAll: req.session.cart.countAll, priceAll: req.session.cart.priceAll})
    }) */
    if(req.session.cart!=null){
        console.log(req.session.cart.items)
        res.render('GioHang', {title: "Giỏ Hàng", items: req.session.cart.items, countAll: req.session.cart.countAll, priceAll: req.session.cart.priceAll})
    }
    else
    res.send('Giohangdangtrong')
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