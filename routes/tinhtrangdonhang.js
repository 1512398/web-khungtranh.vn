billCtr = require('../controllers/billController');
module.exports = (app) => {
    app.get('/tinhtrangdonhang', (req, res)=>{
        console.log(req.user.id);
        var userId = req.user.id;
        billCtr.getAllbyIdUser(userId, function(data){
            res.render('TinhTrangDonHang',{member: req.isAuthenticated(), list: data});
        })
    })
}