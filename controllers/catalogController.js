var controller = {};

var models = require('../models');

const itemsPerPage = 5;
// controller.getById = function(id, callback){
//     models.Catalog
//     .findOne({ 
//         where: {id: id},
//         include: [{model: models.Item}]
//         // include: [{model: models.Item,limit:5,offset:(page-1)*5}],
//     })
//     .then(function(catalog){
//         callback(catalog);
//     }); 
// };
controller.getAll = function(callback){
    models.Catalog
    .findAll()
    .then(function(catalog){
        callback(catalog);
    })
};


controller.getById = function(catalogId, page, callback){
    models.Catalog
    .findOne({ 
        where: {id: catalogId},
        include: [{model: models.Item,limit:itemsPerPage,offset:(page-1)*itemsPerPage}],
    })
    .then(function(catalog){
        callback(catalog);
    });
};

controller.countById = function(catalogId, callback){
    models.Catalog.
    count({ 
        where: {id: catalogId},
        include: [{model: models.Item}],
    })
    .then(function(catalog){
        callback(catalog);
    });
};
module.exports = controller;