var models = require('../models');
var controller = {
    add : function(billDetail, callback) {
        models.BillDetail
        .create({
            billId: billDetail.billId, 
            itemId: billDetail.itemId, 
            img: "",
            count: billDetail.count,
            price: billDetail.price
        })
        .then((billDetail) => {
            callback(billDetail);
        })
    },
    getAll : function (billId, callback) {
        models.BillDetail
            .findAndCountAll({
                where: {billId : billId}
            })
            .then(function (billDetail) {
                callback(billDetail);
            })
    }
}
module.exports = controller;