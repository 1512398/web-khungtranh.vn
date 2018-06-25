'use strict';
module.exports = (sequelize, DataTypes) => {
  var Feedback = sequelize.define('Feedback', {
    content: DataTypes.TEXT,
    name:DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Feedback.associate = function(models) {
    // associations can be defined here
  };
  return Feedback;
};