var controller = {};

var models = require('../models');

controller.getById = function(email, callback){
    models.User
    .findAll({ 
        where: {email: email},
    })
    .then(function(user){
        callback(user);
    });
};

// controller.add = function(article_id,new_cmt, callback){
//     models.Comment
//     .create({
//         comment: new_cmt,
//         ArticleId: article_id,
//     })
//     .then(function(comment){
//         callback(comment);
//     });
// };

controller.edit = function(email, password,address,phoneNum, callback){
    models.User
    .update({
        password:password,
        address: address,
        phoneNum: phoneNum
    },
    {
        where:{email:email}
    })
    .then(function(user){
        callback(user);
    });
};

// controller.delete = function(id, callback){
//     models.Comment
//     .destroy({ 
//         where: {id: id},
//     })
//     .then(function(comment){
//         callback(comment);
//     });
// };


controller.create
module.exports = controller;
