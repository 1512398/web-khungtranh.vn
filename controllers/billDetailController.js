var models = require('../models');
var sequelize = require('sequelize')
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
    },
    filter: function(searchQuery,catalog,callback){
        var whereJson = {};
        var type = searchQuery.type;
        if ((searchQuery.fromDate != undefined) && (searchQuery.fromDate != '')) {
            if (whereJson.createdAt == undefined) whereJson.createdAt = {};
            var tmp = searchQuery.fromDate.split('-');
            var myDate = new Date(parseInt(tmp[0]), parseInt(tmp[1]) - 1, parseInt(tmp[2]));
            whereJson.createdAt.gte = myDate;
        }
    
        if ((searchQuery.toDate != undefined) && (searchQuery.toDate != '')) {
            if (whereJson.createdAt == undefined) whereJson.createdAt = {};
            var tmp = searchQuery.toDate.split('-');
            var myDate = new Date(parseInt(tmp[0]), parseInt(tmp[1]) - 1, parseInt(tmp[2]));
            whereJson.createdAt.lte = myDate;
        }
        models.BillDetail.
            findAll({
                includeIgnoreAttributes: false,
                include: [{model: models.Item, where:{CatalogId:catalog}, attributes:['CatalogId']}],
                attributes:["Item.CatalogId",[sequelize.fn('date_trunc', type, sequelize.col('BillDetail.createdAt')),'createdAt'],[sequelize.fn('SUM', sequelize.col('itemPrice')), 'total']],
                order: [sequelize.fn('date_trunc', type, sequelize.col('BillDetail.createdAt'))],
                where: whereJson,
                group: ['Item.CatalogId',sequelize.fn('date_trunc', type, sequelize.col('BillDetail.createdAt'))]
            })
            .then(function(bill){
                callback(bill);
            })
    }
}
module.exports = controller;