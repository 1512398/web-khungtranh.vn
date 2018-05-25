'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    itemId: DataTypes.STRING,
    itemName: DataTypes.STRING,
    itemImg: DataTypes.STRING,
    itemImgDemo: DataTypes.STRING,
    itemInfo: DataTypes.STRING,
    itemMaterial: DataTypes.STRING,
    itemPrice: DataTypes.STRING,
    itemStars: DataTypes.INTEGER,
    itemCountVotes: DataTypes.INTEGER,
    itemWidthSize: DataTypes.INTEGER,
    itemHeightSize: DataTypes.INTEGER,
    itemType: DataTypes.STRING,
    itemSizeInfo: DataTypes.STRING,
    catalogId: DataTypes.INTEGER

  }, {});
  Item.associate = function (models) {
    Item.belongsTo(models.Catalog);
  };
  return Item;
};