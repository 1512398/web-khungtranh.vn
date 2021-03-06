'use strict';
module.exports = (sequelize, DataTypes) => {
  var Bill = sequelize.define('Bill', {
    userId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    status: DataTypes.STRING,
    img: DataTypes.STRING,
    price: DataTypes.INTEGER,
    count: DataTypes.INTEGER,
    address: DataTypes.STRING,
    tel: DataTypes.STRING,
    typeDeli: DataTypes.STRING,
    costDeli: DataTypes.INTEGER,
    priceFinal: DataTypes.INTEGER,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    fullname: DataTypes.STRING,
    tel: DataTypes.STRING
  }, {});
  Bill.associate = function(models) {
    // associations can be defined here
    Bill.hasMany(models.User);
    Bill.hasMany(models.Item);
    Bill.hasMany(models.BillDetail);
  };
  return Bill;
};