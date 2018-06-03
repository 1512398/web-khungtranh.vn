var controller = {};
function nullToEmpty(name) {
    if ((name == '') || (name == undefined) || (name == null)) {
        return ('/img/emptyImg.png')
    }
    else
        return (name)
}
var models = require('../models');
controller.updateText = function (id, itemId, itemName, itemInfo, itemMaterial, itemPrice, itemWidthSize, itemHeightSize, catalogId, callback) {
    models.Item
        .update({
            itemId: itemId,
            itemName: itemName,
            itemInfo: itemInfo,
            itemMaterial: itemMaterial,
            itemPrice: itemPrice,
            itemWidthSize: itemWidthSize,
            itemHeightSize: itemHeightSize,
            CatalogId: catalogId
        },
            { where: { id: id } })
        .then(function (catalog) {
            callback(catalog);
        });
};

controller.updateItemImg = function (id, itemImg, itemImgDemo, callback) {
    models.Item
        .update({
            itemImg: nullToEmpty(itemImg)
        },
            { where: { id: id } })
        .then(function (item) {
            callback(item);
        });
};

controller.updateItemDemo = function (id, itemImg, itemImgDemo, callback) {
    models.Item
        .update({
            itemImgDemo: nullToEmpty(itemImgDemo),
        },
            { where: { id: id } })
        .then(function (item) {
            callback(item);
        });
};


controller.add = function (itemId, itemName, itemImg, itemImgDemo, itemInfo, itemMaterial, itemPrice, itemWidthSize, itemHeightSize, catalogId, callback) {
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
            CatalogId: catalogId
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
    // console.log(whereJson);
    models.Item.
        findAndCountAll({
            where: whereJson,
            limit:limit,
            offset:offset
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