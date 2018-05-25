var controller = {};

var models = require('../models');
controller.getById = function(id, callback){
    models.Catalog
    .findOne({ 
        where: {id: id},
        include: [{model: models.Item}]
        // include: [{model: models.Item,limit:5,offset:(page-1)*5}],
    })
    .then(function(catalog){
        callback(catalog);
    });
};

module.exports = controller;