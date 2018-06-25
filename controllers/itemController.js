var controller = {};
function nullToEmpty(name) {
    if ((name == '') || (name == undefined) || (name == null)) {
        return ('/img/emptyImg.png')
    }
    else
        return (name)
}
var models = require('../models');
controller.findOne = function(id, callback) {
    models.Item
    .findOne({
        where: {id:id}
    })
    .then(function(item) {
        callback(item);
    })
}
controller.updateText = function (id, itemId, itemName, itemInfo, itemMaterial, itemPrice, itemWidthSize, itemHeightSize, catalogId, itemStatus, callback) {
    models.Item
        .update({
            itemId: itemId,
            itemName: itemName,
            itemInfo: itemInfo,
            itemMaterial: itemMaterial,
            itemPrice: itemPrice,
            itemWidthSize: itemWidthSize,
            itemHeightSize: itemHeightSize,
            CatalogId: catalogId,
            itemStatus:itemStatus
        },
            { where: { id: id } })
        .then(function (catalog) {
            callback(catalog);
        });
};

controller.updateItemImg = function (id, itemImg, callback) {
    models.Item
        .update({
            itemImg: nullToEmpty(itemImg)
        },
            { where: { id: id } })
        .then(function (item) {
            callback(item);
        });
};

controller.updateItemDemo = function (id, itemImgDemo, callback) {
    models.Item
        .update({
            itemImgDemo: nullToEmpty(itemImgDemo),
        },
            { where: { id: id } })
        .then(function (item) {
            callback(item);
        });
};


controller.add = function (itemId, itemName, itemImg, itemImgDemo, itemInfo, itemMaterial, itemPrice, itemWidthSize, itemHeightSize, catalogId, itemStatus, callback) {
    models.Item
        .create({
            itemId: itemId,
            itemName: itemName,
            itemImg: nullToEmpty(itemImg),
            itemImgDemo: nullToEmpty(itemImgDemo),
            itemInfo: itemInfo,
            itemMaterial: itemMaterial,
            itemPrice: itemPrice,
            itemWidthSize: itemWidthSize,
            itemHeightSize: itemHeightSize,
            CatalogId: catalogId,
            itemStatus:itemStatus
        })
        .then(function (catalog) {
            callback(catalog);
        });
};


controller.delete = function (id, callback) {
    models.Item
        .destroy({
            where: { id: id },
        })
        .then(function (catalog) {
            callback(catalog);
        });
};
const sequelize = require('sequelize');
const Op = sequelize.Op;
controller.search = function (searchQuery, limit, offset, callback) {
    var whereJson = {};
    var sortBy = [];
    if ((searchQuery.CatalogId != undefined) && (searchQuery.CatalogId != '')) {
        whereJson.CatalogId = searchQuery.CatalogId;
    }


    if ((searchQuery.fromPrice != undefined) && (searchQuery.fromPrice != '')) {
        if (whereJson.itemPrice == undefined) whereJson.itemPrice = {};
        whereJson.itemPrice.gt = searchQuery.fromPrice;
    }

    if ((searchQuery.toPrice != undefined) && (searchQuery.toPrice != '')) {
        if (whereJson.itemPrice == undefined) whereJson.itemPrice = {};
        whereJson.itemPrice.lt = searchQuery.toPrice;
    }


    if ((searchQuery.fromDate != undefined) && (searchQuery.fromDate != '')) {
        if (whereJson.createdAt == undefined) whereJson.createdAt = {};
        var tmp = searchQuery.fromDate.split('-');
        var myDate = new Date(tmp[2], tmp[0] - 1, tmp[1]);
        whereJson.createdAt.gte = myDate;
    }

    if ((searchQuery.toDate != undefined) && (searchQuery.toDate != '')) {
        if (whereJson.createdAt == undefined) whereJson.createdAt = {};
        var tmp = searchQuery.toDate.split('-');
        var myDate = new Date(tmp[2], tmp[0] - 1, tmp[1]);
        whereJson.createdAt.lte = myDate;
    }
    if ((searchQuery.sortBy != undefined) && (searchQuery.sortBy != '')) {
        switch (searchQuery.sortBy) {
            case "1":
                sortBy = [['itemName','ASC']]
                break;
            case "2":
                sortBy = [['itemName','DESC']]
                break;
            case "3":
                sortBy = [['itemPrice','ASC']]
                break;
            case "4":
                sortBy = [['itemPrice','DESC']]
                break;
            default:
                break;
        }
    }

    if ((searchQuery.findString != undefined) && (searchQuery.findString != '')) {
        var tmp = String(searchQuery.findString).split(' ')
        for (var i =0; i<tmp.length; i++)
        {
            tmp[i] = '%'+tmp[i]+'%';
        }
        console.log(tmp)
        whereJson.itemName = {
            [Op.iLike]: {
                [Op.all
                ]: tmp
            }
        }
    }
    models.Item.
        findAndCountAll({
            where: whereJson,
            limit:limit,
            offset:offset,
            order:sortBy
        }
        )
        .then(function (catalog) {
            callback(catalog);
        });
};

controller.create
module.exports = controller;

                // $or: [
                //     {
                //         itemName: {
                //             $ilike: { $any: query }
                //         }
                //     },
                //     {
                //         itemInfo: {
                //             $ilike: { $any: query }
                //         }
                //     },
                //     {
                //         itemMaterial: {
                //             $ilike: { $any: query }
                //         }
                //     }
                // ]