"use strict";
module.exports = {
  up: function(migration, DataTypes) {
    migration.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      username: {
        type: DataTypes.STRING,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        type: DataTypes.STRING
      },
      facebookId: {
        type: DataTypes.STRING
      },
      facebookToken: {
        type: DataTypes.STRING
      },
      facebookEmail: {
        type: DataTypes.STRING
      },
      facebookName: {
        type: DataTypes.STRING
      },
      googleId: {
        type: DataTypes.STRING
      },
      googleToken: {
        type: DataTypes.STRING
      },
      googleEmail: {
        type: DataTypes.STRING
      },
      googleName: {
        type: DataTypes.STRING
      },
      twitterId: {
        type: DataTypes.STRING
      },
      twitterToken: {
        type: DataTypes.STRING
      },
      twitterDisplayName: {
        type: DataTypes.STRING
      },
      twitterUsername: {
        type: DataTypes.STRING
      },
      resetPasswordToken: {
        type: DataTypes.STRING
      },
      resetPasswordExpires: {
        type: DataTypes.DATE
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: function(migration, DataTypes) {
    migration.dropTable("Users");
  }
};