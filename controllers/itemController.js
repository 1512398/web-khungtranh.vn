var controller = {};
function nullToEmpty(name){
    if ((name == '')||(name== undefined) || (name== null)){
        return('/img/emptyImg.png')
    }
    else 
    return(name)
}
var models = require('../models');
controller.updateText = function(id,itemId,itemName,itemInfo,itemMaterial,itemPrice,itemWidthSize,itemHeightSize,catalogId, callback){
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
    {where: {id:id}})
    .then(function(catalog){
        callback(catalog);
    });
};

controller.updateItemImg = function(id,itemImg,itemImgDemo, callback){
    models.Item
    .update({
        itemImg: nullToEmpty(itemImg)
    },
    {where: {id:id}})
    .then(function(item){
        callback(item);
    });
};

controller.updateItemDemo = function(id,itemImg,itemImgDemo, callback){
    models.Item
    .update({
        itemImgDemo: nullToEmpty(itemImgDemo),
    },
    {where: {id:id}})
    .then(function(item){
        callback(item);
    });
};


controller.add = function(itemId,itemName,itemImg,itemImgDemo,itemInfo,itemMaterial,itemPrice,itemWidthSize,itemHeightSize,catalogId, callback){
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
    .then(function(catalog){
        callback(catalog);
    });
};


controller.delete = function(id, callback){
    models.Item
    .destroy({ 
        where: {id: id},
    })
    .then(function(catalog){
        callback(catalog);
    });
};

controller.search = function (query, callback) {
    models.Item.
        findAll({
            where: {
                $or: [
                    {
                        itemName: {
                            $ilike: { $any: query }
                        }
                    },
                    {
                        itemInfo: {
                            $ilike: { $any: query }
                        }
                    },
                    {
                        itemMaterial: {
                            $ilike: { $any: query }
                        }
                    }
                ]
            }
        }
        )
        .then(function (catalog) {
            callback(catalog);
        });
};

controller.create
module.exports = controller;
