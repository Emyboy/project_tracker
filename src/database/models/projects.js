'use strict';
module.exports = (sequelize, DataTypes) => {
  const Projects = sequelize.define('Projects', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'todo'
    },
    description: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
  }, {});
  Projects.associate = function(models) {
    // associations can be defined here
  };
  return Projects;
};