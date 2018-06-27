var controller = {};

var models = require('../models');

controller.findOne = function(admin, callback) {
    models.Admin
    .findOne({
        where: {admin:admin}
    })
    .then(function(admin) {
        callback(admin)
    })
}
module.exports = controller;