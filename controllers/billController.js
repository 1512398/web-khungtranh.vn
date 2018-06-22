var models = require('../models');
const itemsPerPage = 5;
var controller = {
    add : function(bill, callback) {
        models.Bill
        .create({
            userId: bill.userId, 
            itemId: bill.itemId[0].item.id, 
            date: Date(),
            status: "Đã Thanh Toán",
            img: "",
            count: bill.count,
            price: bill.price
        })
        .then((bill) => {
            callback(bill);
        })
    },
    countBill : function (callback) {
        models.Bill.
        findAndCountAll({
        })
        .then(function(bill) {
            callback(bill);
        });
    },
    getAll : function (page, callback) {
        models.Bill
            .findAll({
                limit: itemsPerPage, offset: (page - 1) * itemsPerPage,
                order: [['id','ASC']]
            })
            .then(function (bill) {
                callback(bill);
            })
    },
    getAllbyIdUser: function(id, callback) {
        models.Bill
        .findAll({
            where:{userId: id}
        })
        .then(function(bill){
            callback(bill)
        })
    }
}
module.exports = controller;