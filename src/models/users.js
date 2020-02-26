'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(70),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    avatar_url:{
      type: DataTypes.STRING(999),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(999),
      allowNull: false
    },
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};