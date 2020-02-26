'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING(999),
        allowNull: false
      },
      avatar_url: {
        type: Sequelize.STRING(999),
        defaultValue: 'https://cdn.onlinewebfonts.com/svg/img_568657.png',
        validate: {
          isUrl: true
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};