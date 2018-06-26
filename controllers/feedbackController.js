var models = require('../models');
const itemsPerPage = 10;
var controller = {
    getAll : (page,callback)=>{
        models.Feedback
        .findAll({
            limit: itemsPerPage, offset: (page - 1) * itemsPerPage
        })
        .then(feedbacks=>{
            callback(feedbacks)
        })
    },
    getbyId : (id, callback)=>{
        models.Feedback
        .findOne({
            where: {id: id}
        })
        .then((feedback)=>{
            callback(feedback)
        })
    }
}

controller.countFeedback = function (callback) {
    models.Feedback.
    findAndCountAll({
    })
    .then(function(feedback) {
        callback(feedback);
    });
  }


controller.add = function(content,name, phone, email,callback){
    models.Feedback
    .create({
        content: content,
        name:name,
        phone:phone,
        email:email
    })
    .then(function(feedback){
        callback(feedback);
    });
};

module.exports = controller;