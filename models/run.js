'use strict';
module.exports = (sequelize, DataTypes) => {
  const Run = sequelize.define('Run', {
    location: DataTypes.STRING,
    organiser: DataTypes.STRING,
    website: DataTypes.STRING
  }, {});
  Run.associate = function(models) {
    // associations can be defined here
  };
  return Run;
};