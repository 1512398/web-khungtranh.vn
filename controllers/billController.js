var models = require('../models');
const itemsPerPage = 5;
var controller = {
    add : function(bill, callback) {
        models.Bill
        .create({
            userId: bill.userId, 
            itemId: bill.itemId[0].item.id, 
            date: Date(),
            status: bill.status,
            img: "",
            count: bill.count,
            price: bill.price,
            typeDeli: bill.typeDeli,
            costDeli: bill.costDeli,
            priceFinal: bill.price + bill.costDeli,
            email: bill.email,
            address: bill.address, 
            fullname: bill.fullname,
            tel: bill.tel
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
    countBillbyUserId: function(id, callback) {
        models.Bill
        .findAndCountAll({
            where:{userId: id}
        })  
        .then(function(bill){
            callback(bill)
        })
    },
    getAllbyUserId: function(id, page, callback) {
        models.Bill
        .findAll({
            where:{userId: id},
            limit: itemsPerPage, offset: (page - 1) * itemsPerPage,
            order: [['id','ASC']]
        })
        .then(function(bill) {
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
    },
    findOne: function(id, callback) {
        models.Bill
        .findOne({
            where: {
                id: id
            }
        })
        .then(function(bill){
            callback(bill)
        })
    },
    updateStt: function(id, callback) {
        models.Bill
        .update({
            status: "Đã Hủy"
        },{
            where: {id:id}
        })
        .then(function(bill) {
            callback(bill)
        })
    }
}
module.exports = controller;