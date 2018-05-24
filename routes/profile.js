var express = require('express');
var router = express.Router();
var bCrypt = require('bcrypt-nodejs');

var userController = require('../controllers/userController');

var isValidPassword = function (userpass, password) {
    return bCrypt.compareSync(password, userpass);
}

router.get('/', isLoggedIn, function (req, res) {
    res.render('CapNhatThongTin',{user:req.user, message: req.flash('updateProfileMessage'), messageSuccess: req.flash('updateSuccessful')});   
})

router.post('/update',isLoggedIn,function(req,res){

    if (isValidPassword(req.user.password, req.body.password)){

        var new_pass
        if (req.body.new_password=='')
            new_pass = req.user.password
        else
            new_pass = req.body.new_password

       
        userController.edit(
            req.user.email,
            new_pass,
            req.body.address,
            req.body.phoneNum,
            function(){});
        req.flash('updateSuccessful', 'Các thay đổi đã được cập nhật thành công !')
    }
    else{
        console.log('invalid');
        req.flash('updateProfileMessage', 'Cập nhật không thành công - Mật khẩu không đúng')
    }
    res.redirect('/CapNhatThongTin')
})
module.exports = router;
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
