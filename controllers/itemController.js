var controller = {};

var models = require('../models');

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
