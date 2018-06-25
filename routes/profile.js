var express = require('express');
var router = express.Router();
var bCrypt = require('bcrypt-nodejs');

var userController = require('../controllers/userController');

var isValidPassword = function (userpass, password) {
    return bCrypt.compareSync(password, userpass);
}

var csrf = require('csurf')
var csrfProtection = csrf({ cookie: true })

router.get('/', isLoggedIn, csrfProtection, function (req, res) {
    req.session.avtImg = req.user.avtImg
    if  (req.session.avtImg == undefined){
        req.session.avtImg = '/img/blank_avt.png'
    }
    var avtPath =req.session.avtImg;
    res.render('CapNhatThongTin', {imgPath:avtPath, user: req.user, message: req.flash('updateProfileMessage'), messageSuccess: req.flash('updateSuccessful'),
        title: 'Cap nhat thong tin',member: req.isAuthenticated(),csrfToken: req.csrfToken() });
})
// Set storage engine
const multer = require('multer');
const path = require('path')
const storage = multer.diskStorage({
	destination: './public/uploads/',
	filename: function (req,file,cb) {
		cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	  }	
})

//Init Upload
const upload = multer({
	storage: storage,
	limits:{fileSize:100000000}
}).single('myImg');

router.post('/update',
    isLoggedIn,
    function(req,res,next){  
        upload(req, res, function(err){
            if ((err)||(req.file === undefined)) {
                return next();
            }
            else{
                userController.editAvt(req.user.email,String(req.file.path).replace('public',''),function(user){
                    return next();
                });
            }
        })
    },csrfProtection,
    function (req, res) {
    var new_pass = '';
    if (req.body.new_password == '') // neu khong co yeu cau thay doi mat khau
        new_pass = req.user.password
    else // neu co yeu cau thay doi mat khau
    {
        if (isValidPassword(req.user.password, req.body.password)) // kiem tra password hien tai co khop voi password cu
            new_pass = bCrypt.hashSync(req.body.new_password, bCrypt.genSaltSync(8), null);  // neu trung khop, chuan bi update DB
        else
            {
                req.flash('updateProfileMessage', 'Cập nhật không thành công - Mật khẩu không đúng'); // Thong bao loi va ket thuc
                res.redirect('/CapNhatThongTin');
                return;
            }
    }
    userController.edit(
        req.user.email,
        new_pass,
        req.body.address,
        req.body.phoneNum,
        function (user) {
            req.flash('updateSuccessful', 'Các thay đổi đã được cập nhật thành công !');
            res.redirect('/CapNhatThongTin');
        });
})


router.post('/uploadAvt', function (req,res) {
	upload(req, res, function(err){
		if ((err)||(req.file === undefined)) {
			res.redirect('/CapNhatThongTin');
		}
		else{
			req.session.avtImg = String(req.file.path).replace('public','');
			res.redirect('/CapNhatThongTin');
			
		}
	})
  })


module.exports = router;
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
