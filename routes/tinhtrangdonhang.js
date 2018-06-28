billCtr = require('../controllers/billController');
module.exports = (app) => {
    app.get('/tinhtrangdonhang', isLoggedIn, (req, res)=>{
        console.log(req.user.id);
        var userId = req.user.id;
        billCtr.getAllbyIdUser(userId, function(data){
            console.log(data);
            res.render('TinhTrangDonHang',{member: req.isAuthenticated(), list: data, title:'Tình Trạng Đơn Hàng', userId: userId});
        })
    })
}
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
