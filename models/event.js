"use strict";

module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define("Event", {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Event.belongsTo(models.User);
      }
    }
  });

  return Event;
};
