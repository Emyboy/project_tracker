'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING(999),
      allowNull: false
    },
    avatar_url: {
      type: DataTypes.STRING(999),
      defaultValue: 'https://cdn.onlinewebfonts.com/svg/img_568657.png',
      validate: {
        isUrl: true
      }
    },
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};