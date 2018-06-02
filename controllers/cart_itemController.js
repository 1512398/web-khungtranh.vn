var models = require('../models');

var controller = {
    getAll : (callback)=>{
        models.Item
        .findAll()
        .then(items=>{
            //console.log(items);
            callback(items)
        })
    },
    getbyId : (id, callback)=>{
        models.Item 
        .findOne({
            where: {id: id}
        })
        .then((item)=>{
            callback(item)
        })
    }
}

module.exports = controller;