var controller = {};

var models = require('../models');

const itemsPerPage = 5;

controller.getAll = function (callback) {
    models.Catalog
        .findAll({
            include: [{ model: models.Item}],
            order: [['title','ASC']],
            where: {deleted:0 }
        })
        .then(function (catalog) {
            callback(catalog);
        })
};

controller.getById = function (catalogId, page, callback) {
    models.Catalog
        .findOne({
            where: { id: catalogId, deleted:0 },
            include: [{ model: models.Item, limit: itemsPerPage, offset: (page - 1) * itemsPerPage }]
        })
        .then(function (catalog) {
            callback(catalog);
        });
};

controller.add = function(new_title,new_summary, callback){
    models.Catalog
    .create({
        title: new_title,
        summary: new_summary,
        deleted:0
    })
    .then(function(catalog){
        callback(catalog);
    });
};

controller.update = function(id,new_title,new_summary, callback){
    models.Catalog
    .update({
        title: new_title,
        summary: new_summary,
    },
    {
        where:{id:id}
    })
    .then(function(catalog){
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

controller.delete = function(id, callback){
    models.Catalog
    .update({
        deleted: 1
    },
    {
        where:{id,id}
    })
    .then(function(catalog){
        callback(catalog);
    });
};
module.exports = controller;