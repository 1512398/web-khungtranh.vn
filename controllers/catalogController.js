var controller = {};

var models = require('../models');

const itemsPerPage = 5;

controller.getAll = function (callback) {
    models.Catalog
        .findAll({
            include: [{ model: models.Item }],
        })
        .then(function (catalog) {
            callback(catalog);
        })
};


controller.getById = function (catalogId, page, callback) {
    models.Catalog
        .findOne({
            where: { id: catalogId },
            include: [{ model: models.Item, limit: itemsPerPage, offset: (page - 1) * itemsPerPage }],
        })
        .then(function (catalog) {
            callback(catalog);
        });
};

controller.countById = function (catalogId, callback) {
    models.Catalog.
        count({
            where: { id: catalogId },
            include: [{ model: models.Item }],
        })
        .then(function (catalog) {
            callback(catalog);
        });
};
module.exports = controller;