billCtr = require('../controllers/billController');
billDetailCtr = require('../controllers/billDetailController');
module.exports = (app) => {
    app.post('/bill_pay_done', (req, res)=>{
        var iBill = req.body;
        console.log(iBill);
        billCtr.add(iBill, function(data){
            //console.log(data.id);
            iBill.itemId.forEach(element => {
                var Json = {
                    billId: data.id,
                    itemId: element.item.id,
                    count: element.count, 
                    price: element.price
                }
                billDetailCtr.add(Json, function(data){
                    console.log('done');
                })
            });
        });
    })
    app.post('/getCountItemInCart', function(req, res){
        console.log('tao day');
        console.log();
    })
}