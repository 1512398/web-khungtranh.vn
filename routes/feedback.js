var express = require('express');
var router = express.Router();

var feedbackController = require('../controllers/feedbackController');

router.get('/', function(req,res){
    res.render('LienHe',{member: req.isAuthenticated(),title:'Liên hệ',name:'lienhe',message: req.flash('messageLienHe')});
});

router.post('/sendFeedBack',function(req,res,){
    feedbackController.add(req.body.content, req.body.name,req.body.phone, req.body.email,function(feedback){
        req.flash('messageLienHe', 'Thông tin phản hồi đã được gửi thành công !');
            res.redirect('/LienHe');
    });
   
})



module.exports = router;