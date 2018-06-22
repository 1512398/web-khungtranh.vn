'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      phoneNum: DataTypes.STRING,    
      status: DataTypes.BOOLEAN,
      facebook_email:DataTypes.STRING,
      facebook_name:DataTypes.STRING,
      facebook_id:DataTypes.STRING,
      facebook_token:DataTypes.STRING,
      google_email:DataTypes.STRING,
      google_name:DataTypes.STRING,
      google_id:DataTypes.STRING,
      google_token:DataTypes.STRING,
      avtImg: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.belongsTo(models.Bill);
  };
  return User;
};