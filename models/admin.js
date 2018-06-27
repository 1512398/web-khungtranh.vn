'use strict';
module.exports = (sequelize, DataTypes) => {
  var Admin = sequelize.define('Admin', {
    admin: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  Admin.associate = function(models) {

  };
  return Admin;
};