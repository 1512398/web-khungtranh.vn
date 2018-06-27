var models = require('../models');
var sequelize = require('sequelize')
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
            price: bill.price,
            typeDeli: bill.typeDeli,
            costDeli: bill.costDeli,
            priceFinal: bill.price + bill.costDeli
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
    },
    filter: function(searchQuery,callback){
        var whereJson = {};
        whereJson.status = 'Đã Thanh Toán';
        var type = searchQuery.type;
        if ((searchQuery.fromDate != undefined) && (searchQuery.fromDate != '')) {
            if (whereJson.createdAt == undefined) whereJson.createdAt = {};
            var tmp = searchQuery.fromDate.split('-');
            var myDate = new Date(parseInt(tmp[0]), parseInt(tmp[1]) - 1, parseInt(tmp[2]));
            // console.log('start day:')
            // console.log(myDate)
            whereJson.createdAt.gte = myDate;
        }
    
        if ((searchQuery.toDate != undefined) && (searchQuery.toDate != '')) {
            if (whereJson.createdAt == undefined) whereJson.createdAt = {};
            var tmp = searchQuery.toDate.split('-');
            var myDate = new Date(parseInt(tmp[0]), parseInt(tmp[1]) - 1, parseInt(tmp[2]));
            // console.log('to day:')
            // console.log(myDate)
            whereJson.createdAt.lte = myDate;
        }
        models.Bill.
            findAll({
                attributes:[[sequelize.fn('date_trunc', type, sequelize.col('createdAt')),'createdAt'], [sequelize.fn('SUM', sequelize.col('price')), 'total']],
                where: whereJson,
                order: [sequelize.fn('date_trunc', type, sequelize.col('createdAt'))],
                group: [sequelize.fn('date_trunc', type, sequelize.col('createdAt'))]
            })
            .then(function(bill){
                callback(bill);
            })
    }
}
module.exports = controller;