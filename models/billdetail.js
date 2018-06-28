'use strict';
module.exports = (sequelize, DataTypes) => {
  var BillDetail = sequelize.define('BillDetail', {
    billId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    count: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    img: DataTypes.STRING,
    width: DataTypes.STRING,
    height: DataTypes.STRING
  }, {});
  BillDetail.associate = function(models) {
    // associations can be defined here
    BillDetail.belongsTo(models.Item,{targetKey:'id', foreignKey: 'itemId'})
  };
  return BillDetail;
};