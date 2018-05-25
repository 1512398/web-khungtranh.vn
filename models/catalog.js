'use strict';
module.exports = (sequelize, DataTypes) => {
  var Catalog = sequelize.define('Catalog', {
    title: DataTypes.STRING,
    summary: DataTypes.STRING
  }, {});
  Catalog.associate = function (models) {
    Catalog.hasMany(models.Item);
  };
  return Catalog;
};