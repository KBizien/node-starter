// load strategies modules
var FacebookStrategy = require('passport-facebook').Strategy;

// Models
var models = require('../../models');

// expose this function to our app using module.exports
module.exports = function(passport, flash) {
  // =========================================================================
  // FACEBOOK SIGNUP/SIGNIN ============================================================
  // =========================================================================

  passport.use(new FacebookStrategy({
    // pull in our app id and secret from our auth.js file
    clientID        : process.env.FACEBOOK_AUTH_CLIENT_ID,
    clientSecret    : process.env.FACEBOOK_AUTH_CLIENT_SECRET,
    callbackURL     : process.env.FACEBOOK_AUTH_CALLBACK_URL,
    passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
  },
  // facebook will send back the token and profile
  function (req, token, refreshToken, profile, done) {
    // asynchronous

    var facebookId = profile.id;
    var facebookEmail = profile.emails[0].value;
    var facebookName = profile.name.givenName + ' ' + profile.name.familyName;
    var facebookToken = token;

    process.nextTick(function () {

      if (!req.user) {
        // find the user in the database based on their facebook id
        models.User.findFacebookId(facebookId).then(function (user) {
          if (user) {
            // if there is a user id already but no token
            // just add our token and profile information
            if (!user.facebookToken) {
              user.updateFacebookInfos(facebookEmail, facebookName, facebookId, facebookToken).then(function (err, user) {
                return done(null, user, req.flash('info', 'Hello ' +user.facebookName + ', your facebook account is now linked'));
              }).catch(function (err) {
                console.log('ERR Facebook update : ', err);
                return err;
              });
            }
            return done(null, user, req.flash('info', 'Hello ' + user.facebookName)); // user found, return that user
          } else {
            models.User.createOneFacebook(facebookEmail, facebookName, facebookId, facebookToken).then(function (user) {
              return done(null, user, req.flash('info', 'Welcome ' + user.facebookName));
            }).catch(function (err) {
              console.log('ERR create facebook : ', err);
              return err;
            });
          }
        }).catch(function (err) {
          console.log('ERR find facebook id : ', err);
          return err;
        });
      } else {
        // user already exists and is logged in, we have to link accounts
        var user = req.user; // pull the user out of the session

        user.updateFacebookInfos(facebookEmail, facebookName, facebookId, facebookToken).then(function (user) {
          return done(null, user, req.flash('info', 'Your facebook account is now linked'));
        }).catch(function (err) {
          console.log('ERR update facebook infos : ', err);
          return err;
        });
      }
    });
  }));
};