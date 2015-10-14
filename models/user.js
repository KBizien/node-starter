"use strict";

//load bcrypt module
var bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    facebookId: DataTypes.INTEGER,
    facebookToken: DataTypes.STRING,
    facebookEmail: DataTypes.STRING,
    facebookName: DataTypes.STRING,
    twitterId: DataTypes.INTEGER,
    twitterToken: DataTypes.STRING,
    twitterDisplayName: DataTypes.STRING,
    twitterUsername: DataTypes.STRING,
    googleId: DataTypes.INTEGER,
    googleToken: DataTypes.STRING,
    googleEmail: DataTypes.STRING,
    googleName: DataTypes.STRING,
    resetPasswordToken: DataTypes.STRING,
    resetPasswordExpires: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      findForLogin: function (username) {
        return this.findOne({
          where: {
            username: username
          }
        });
      },
      findEmail: function (email) {
        return this.findOne({
          where: {
            email: email
          }
        });
      },
      findForSignin: function (username, email) {
        return this.findOne({
          where: {
            $or: [
              { username: username },
              { email: email }
            ]
          }
        });
      },
      matchToken: function (token) {
        return this.findOne({
          where: {
            $and: [
              { resetPasswordToken: token },
              { resetPasswordExpires: { gt: Date.now() }}
            ]
          }
        });
      },
      findFacebookId: function (id) {
        return this.findOne({
          where: {
            facebookId: id
          }
        });
      },
      findTwitterId: function (id) {
        return this.findOne({
          where: {
            twitterId: id
          }
        });
      },
      findGoogleId: function (id) {
        return this.findOne({
          where: {
            googleId: id
          }
        });
      },
      createOneLocal: function (username, email, password) {
        return this.create({
          username: username,
          email: email,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(8))
        });
      },
      createOneFacebook: function (facebookEmail, facebookName, facebookId, facebookToken) {
        return this.create({
          facebookEmail: facebookEmail,
          facebookName: facebookName,
          facebookId: facebookId,
          facebookToken: facebookToken
        });
      },
      createOneTwitter: function (twitterUsername, twitterDisplayName, twitterId, twitterToken) {
        return this.create({
          twitterUsername: twitterUsername,
          twitterDisplayName: twitterDisplayName,
          twitterId: twitterId,
          twitterToken: twitterToken
        });
      },
      createOneGoogle: function (googleEmail, googleName, googleId, googleToken) {
        return this.create({
          googleEmail: googleEmail,
          googleName: googleName,
          googleId: googleId,
          googleToken: googleToken
        });
      }
    },
    instanceMethods: {
      validPassword: function (password) {
        return bcrypt.compareSync(password, this.password);
      },
      updatePassword: function (password) {
        return this.updateAttributes({
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(8)),
          resetPasswordToken: null,
          resetPasswordExpires: null
        });
      },
      updateLoginInfos: function (username, email, password) {
        return this.updateAttributes({
          username: username,
          email: email,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(8))
        });
      },
      updateFacebookInfos: function (facebookEmail, facebookName, facebookId, facebookToken) {
        return this.updateAttributes({
          facebookEmail: facebookEmail,
          facebookName: facebookName,
          facebookId: facebookId,
          facebookToken: facebookToken
        });
      },
      updateTwitterInfos: function (twitterUsername, twitterDisplayName, twitterId, twitterToken) {
        return this.updateAttributes({
          twitterUsername: twitterUsername,
          twitterDisplayName: twitterDisplayName,
          twitterId: twitterId,
          twitterToken: twitterToken
        });
      },
      updateGoogleInfos: function (googleEmail, googleName, googleId, googleToken) {
        return this.updateAttributes({
          googleEmail: googleEmail,
          googleName: googleName,
          googleId: googleId,
          googleToken: googleToken
        });
      },
      forgotPassword: function (token) {
        return this.updateAttributes({
          resetPasswordToken: token,
          resetPasswordExpires: Date.now() + 3600000 // 1 hour
        });
      },
      destroyOne: function () {
        return this.destroy();
      }
    }
  });

  return User;
};
