var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.redirect('/admin/index')
    // res.render('DatHang',{member: req.isAuthenticated(),name:'dathang', title:'Đặt Hàng',catalog:catalog});
})
router.get('/index', function (req, res) {
    res.render('admin_dashboard', { layout: 'layout_admin' })
})
router.get('/manage_account', function (req, res) {
    res.render('admin_manage_accounts', { layout: 'layout_admin' })
})

router.get('/manage_bill', function (req, res) {
    res.render('admin_manage_bills', { layout: 'layout_admin' })
})
router.get('/manage_item', function (req, res) {
    res.render('admin_manage_items', { layout: 'layout_admin' })
})

router.get('/mail_inbox', function (req, res) {
    res.render('admin_manage_items', { layout: 'layout_admin' })
})
var userController = require('../controllers/userController');
router.get('/getUserInfo', function (req, res) {
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

router.get('/banUser', function (req, res) {
    console.log(req.query.action)
    userController.banUser(req.query.userId, req.query.action, function (data) {
        res.send('oke')
    })
})

var catalogController = require('../controllers/catalogController');
router.get('/getCatalogInfo', function (req, res) {
    catalogController.getAll(function (catalog) {
        // console.log(catalog);
        var arr_catalog = [];
        catalog.forEach(element => {
            arr_catalog.push({ id: element.id, title: element.title, summary: element.summary, count: element.Items.length });
            // console.log(element.Items.length)
        });
        res.json({ catalogs: arr_catalog });
        // console.log(catalog.Items.length)
    })
})

router.post('/newCatalog', function (req, res) {
    catalogController.add(req.body.title, req.body.summary, function (catalog) {
        res.send('oke');
    })
})

router.post('/editCatalog', function (req, res) {
    catalogController.update(req.body.id, req.body.title, req.body.summary, function (catalog) {
        res.send('oke');
    })
})

router.post('/deleteCatalog', function (req, res) {
    catalogController.delete(req.body.id, function (catalog) {
        res.send('oke');
    })
})

const upload = require('../routes/uploadImg')

var itemController = require('../controllers/itemController');
router.post('/deleteItem', function (req, res) {
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
            function (item) {
            res.send(req.body);
        })
    });
router.post('/editItem',
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
    
    function (req, res) {
            var imgPath = '#';
            var demoPath = '#';
            if (req.files.itemImg!=undefined){
                imgPath =  String(req.files.itemImg[0].path).replace('public','')
                itemController.updateItemImg(req.body.id,imgPath);
            }
            if (req.files.itemDemo!=undefined){
                imgDemo =  String(req.files.itemDemo[0].path).replace('public','')
                itemController.updateItemDemo(req.body.id,imgDemo);
            }
            console.log(req.body)
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
                function (item) {
                res.send('done');
            })
        });
module.exports = router;