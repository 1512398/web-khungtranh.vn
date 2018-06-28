var express = require('express');
var router = express.Router();
var csrf = require('csurf')
var csrfProtection = csrf({ cookie: true })
var jwtad = require('./admin_JWT.js')

// ADMIN GET METHOD
router.get('/', function (req, res) {
    res.redirect('/admin/index')
})
router.get('/index', function (req, res) {
    console.log(req.session.authData)
    res.render('admin_dashboard', { layout: 'layout_admin' })
})
router.get('/manage_account', csrfProtection, function (req, res) {
    res.render('admin_manage_accounts', { layout: 'layout_admin', csrfToken: req.csrfToken() })
})

router.get('/manage_bill', function (req, res) {
    res.render('admin_manage_bills', { layout: 'layout_admin' })
})
router.get('/manage_item', csrfProtection, function (req, res) {
    res.render('admin_manage_items', { layout: 'layout_admin', csrfToken: req.csrfToken() })
})

router.get('/mail_inbox', function (req, res) {
    res.render('admin_mail_box', { layout: 'layout_admin' })
})

router.get('/login',function (req,res) {
    res.render('admin_signin');
  })

// QUẢN LÝ USERS
var userController = require('../controllers/userController');
router.get('/getUserInfo', jwtad.verifyToken,function (req, res) {
    var limit = 5;
    var page = parseInt(req.query.page);
    page = isNaN(page) ? 1 : page;
    userController.countUser(function (count) {
        countUsers = count.count;
        userController.getAll(page, function (users) {
            res.json({
                users: users, pagination: {
                    num_of_pages: Math.ceil(countUsers / limit),
                    limit: limit,
                    num_of_items: countUsers
                }
            });

        });
    })
})
router.post('/banUser', csrfProtection, jwtad.verifyToken, function (req, res) {
    userController.banUser(req.body.userId, req.body.action, function (data) {
        res.send('oke')
    })
})


// QUẢN LÝ FEEDBACKS
var feedbackController = require('../controllers/feedbackController');
router.get('/getAllFeedback', jwtad.verifyToken, function (req, res) {
    var limit = 10;
    var page = parseInt(req.query.page);
    page = isNaN(page) ? 1 : page;
    feedbackController.countFeedback(function (counts) {
        countFeedbacks = counts.count;
        feedbackController.getAll(page, function (feedbacks) {
                res.json({
                feedbacks: feedbacks, pagination: {
                    num_of_pages: Math.ceil(countFeedbacks/ limit),
                    limit: limit,
                    num_of_items: countFeedbacks
                }
            });

        });
    })
})

// QUẢN LÝ ĐƠN HÀNG
BillsCtr = require('../controllers/billController');
router.get('/getBillInfo',jwtad.verifyToken, function (req, res) {
    var limit = 5;
    var page = parseInt(req.query.page);
    page = isNaN(page) ? 1 : page;
    BillsCtr.countBill(function (count) {
        countBills = count.count;
        BillsCtr.getAll(page, function (bills) {
            res.json({
                bills: bills, pagination: {
                    num_of_pages: Math.ceil(countBills / limit),
                    limit: limit,
                    num_of_items: countBills
                }
            });
        });
    })
})


router.get('/getBillInfoForUser',jwtad.verifyToken, function (req, res) {
    var limit = 5;
    var page = parseInt(req.query.page);
    var userId = parseInt(req.query.id);
    page = isNaN(page) ? 1 : page;
    BillsCtr.countBillbyUserId(userId, function (count) {
        countBills = count.count;
        BillsCtr.getAllbyUserId(userId, page, function (bills) {
            res.json({
                bills: bills, pagination: {
                    num_of_pages: Math.ceil(countBills / limit),
                    limit: limit,
                    num_of_items: countBills
                }
            });
        });
    })
})


// QUẢN LÝ DANH MỤC MẶT HÀNG
var catalogController = require('../controllers/catalogController');
router.get('/getCatalogInfo', function (req, res) {
    catalogController.getAll(function (catalog) {
        var arr_catalog = [];
        catalog.forEach(element => {
            arr_catalog.push({ id: element.id, title: element.title, summary: element.summary, count: element.Items.length });
        });
        res.json({ catalogs: arr_catalog });
    })
})

router.post('/newCatalog',jwtad.verifyToken, csrfProtection, function (req, res) {
    catalogController.add(req.body.title, req.body.summary, function (catalog) {
        res.send('oke');
    })
})

router.post('/editCatalog',jwtad.verifyToken, csrfProtection, function (req, res) {
    catalogController.update(req.body.id, req.body.title, req.body.summary, function (catalog) {
        res.send('oke');
    })
})

router.post('/deleteCatalog', jwtad.verifyToken, csrfProtection, function (req, res) {
    catalogController.delete(req.body.id, function (catalog) {
        res.send('oke');
    })
})


// QUẢN LÝ MẶT HÀNG
const upload = require('../routes/uploadImg')

var itemController = require('../controllers/itemController');
router.post('/deleteItem', jwtad.verifyToken, csrfProtection, function (req, res) {
    itemController.delete(req.body.id, function (catalog) {
        res.send('oke');
    })
})
router.post('/newItem', 
    function (req, res, next) {
       
        upload.fields([{name:'itemImg',maxCount:1},{name:'itemDemo',maxCount:1}])(req, res, function (err) {
            console.log(req.files);
            if ((err) || (req.files === undefined)) {
                console.log('imgupload faileddd')
                return next();
            }
            else {
                console.log('success!')
                return next();
            }
        })
    },
    jwtad.verifyToken,
    csrfProtection,
    function (req, res) {
        var imgPath = '';
        var demoPath = '';
        if (req.files.itemImg!=undefined){
            imgPath =  String(req.files.itemImg[0].path).replace('public','')
        }
        if (req.files.itemDemo!=undefined){
            imgDemo =  String(req.files.itemDemo[0].path).replace('public','')
        }
        itemController.add(
            req.body.itemId,
            req.body.itemName,
            imgPath,
            demoPath,
            req.body.itemInfo,
            req.body.itemMaterial,
            req.body.itemPrice,
            req.body.itemWidthSize,
            req.body.itemHeightSize,
            req.body.catalogId,
            req.body.itemStatus,
            function (item) {
            res.send(req.body);
        })
    });
router.post('/editItem', 
    function (req, res, next) {
       
        upload.fields([{name:'itemImg',maxCount:1},{name:'itemDemo',maxCount:1}])(req, res, function (err) {
            if ((err) || (req.files === undefined)) {
                console.log('imgupload faileddd')
                return next();
            }
            else {
                console.log('success!')
                return next();
            }
        })
    },
    jwtad.verifyToken,
    csrfProtection,
    function (req, res) {
            var imgPath = '#';
            var demoPath = '#';
            if (req.files.itemImg!=undefined){
                imgPath =  String(req.files.itemImg[0].path).replace('public','')
                itemController.updateItemImg(req.body.id,imgPath,function(avt){});
            }
            if (req.files.itemDemo!=undefined){
                imgDemo =  String(req.files.itemDemo[0].path).replace('public','')
                itemController.updateItemDemo(req.body.id,imgDemo,function(avt){});
            }
            itemController.updateText(
                req.body.id,
                req.body.itemId,
                req.body.itemName,
                req.body.itemInfo,
                req.body.itemMaterial,
                req.body.itemPrice,
                req.body.itemWidthSize,
                req.body.itemHeightSize,
                req.body.catalogId,
                req.body.itemStatus,
                function (item) {
                    res.send('oke')
            })
        });


// QUẢN LÝ ĐƠN HÀNG
billDetailCtr = require('../controllers/billDetailController')
router.post('/manage_bill/item',jwtad.verifyToken,  function(req, res) {
    itemController.findOne(req.body.itemId, function(data) {
        res.send(data);
    })
    
})

router.post('/manage_bill/user', jwtad.verifyToken, function(req, res) {
    userController.findOne(req.body.userId, function(data) {
        res.send(data);
    })
})
router.post('/manage_bill/bill', jwtad.verifyToken,  function(req, res){
    BillsCtr.findOne(req.body.billId, function(data){
        res.send(data);
    })
})

router.post('/manage_bill/billitem',jwtad.verifyToken, function(req, res){
    billDetailCtr.getAll(req.body.id, function(src){
        res.send(src);
    })
})

// QUẢN LÝ ĐĂNG NHẬP ADMIN
router.post("/login", jwtad.login);
router.get("/logout",function (req,res) {
    res.cookie('JWT','');
    res.redirect('/')
  })

router.get('/adminName', jwtad.verifyToken, function (req,res) {
    res.send(req.session.authData.admin);
    // res.send('oke')
  })

// QUẢN LÝ XUẤT BÁO CÁO - VẼ BIỂU ĐỒ
router.post("/thongke", jwtad.verifyToken, function(req,res){
    BillsCtr.filter(req.body,function(data){
        res.json(data);
    })
});

router.post("/thongketheoloai", jwtad.verifyToken, function(req,res){
    catalogController.getAll(function (catalog) {
        var stt = [];
        var count = 0;
        catalog.forEach(element => {
            billDetailCtr.filter(req.body,element.id,function(data){
                value = [];
                label = [];
                if (data.length!=0)
                {
                    for (i =0; i< data.length;i++){
                        value.push(data[i].dataValues.prc)
                        label.push(data[i].dataValues.createdAt)
                    }
                }
                tmp={}
                tmp.value = value;
                tmp.name = element.title;
                tmp.id = element.id;
                tmp.label = label;
                stt.push(tmp);
                count ++;
                if (count == catalog.length){
                    res.send(stt)
                }
        });
    })
    })
})
module.exports = router;