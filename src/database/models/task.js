'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    difficulty: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Todo'
    },
    description: {
      type: DataTypes.STRING,
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    priority: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
  };
  return Task;
};