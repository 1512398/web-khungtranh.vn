var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.redirect('/admin/index')
    // res.render('DatHang',{member: req.isAuthenticated(),name:'dathang', title:'Đặt Hàng',catalog:catalog});
})
router.get('/index', function (req, res) {
    res.render('admin_dashboard',{layout:'layout_admin'})
})
router.get('/manage_account', function (req, res) {
    res.render('admin_manage_accounts',{layout:'layout_admin'})
})

router.get('/manage_bill', function (req, res) {
    res.render('admin_manage_bills',{layout:'layout_admin'})
})
router.get('/manage_item', function (req, res) {
    res.render('admin_manage_items',{layout:'layout_admin'})
})

router.get('/mail_inbox', function (req, res) {
    res.render('admin_manage_items',{layout:'layout_admin'})
})
var userController = require('../controllers/userController');
router.get('/getUserInfo',function (req,res) {
    var limit = 5;
    var page = parseInt(req.query.page);
    page = isNaN(page) ? 1 : page;
    userController.countUser(function(count){
        countUsers = count.count;
        userController.getAll(page, function (users) {
            res.json({users: users, pagination: {
                num_of_pages:Math.ceil(countUsers/limit),
                limit:limit,
                num_of_items: countUsers
            }});
    
        });
    })
  })

router.get('/banUser',function(req,res){
    console.log(req.query.action)
    userController.banUser(req.query.userId,req.query.action,function (data) {
        res.send('oke')
      })
})
module.exports = router;