// load strategies modules
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Models
var models = require('../../models');

// expose this function to our app using module.exports
module.exports = function(passport, flash) {

  // =========================================================================
  // GOOGLE SIGNUP/SIGNIN ====================================================
  // =========================================================================
  passport.use(new GoogleStrategy({
    clientID        : process.env.GOOGLE_AUTH_CLIENT_ID,
    clientSecret    : process.env.GOOGLE_AUTH_CLIENT_SECRET,
    callbackURL     : process.env.GOOGLE_AUTH_CALLBACK_URL,
    passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
  },
  function (req, token, refreshToken, profile, done) {
    // asynchronous

    var googleId = profile.id;
    var googleEmail = profile.emails[0].value;
    var googleName = profile.displayName;
    var googleToken = token;

    // User.findOne won't fire until we have all our data back from Google
    process.nextTick(function () {
      if (!req.user) {
        // try to find the user based on their google id
        models.User.findGoogleId(googleId).then(function (user) {
          if (user) {
            // if there is a user id already but no token
            // just add our token and profile information
            if (!user.googleToken) {
              user.updateGoogleInfos(googleEmail, googleName, googleId, googleToken).then(function (user) {
                return done(null, user, req.flash('info', 'Hello ' + user.googleName + ', your google account is now linked'));
              }).catch(function (err) {
                console.log('ERR twitter update infos : ', err);
                return err;
              });
            }
            return done(null, user, req.flash('info', 'Hello ' + user.googleName)); // user found, return that user
          } else {
            // if the user isnt in our database, create a new user
            models.User.createOneGoogle(googleEmail, googleName, googleId, googleToken).then(function (user) {
              return done(null, user, req.flash('info', 'Welcome ' + user.googleName));
            }).catch(function (err) {
              console.log('ERR create google : ', err);
              return err;
            });
          }
        }).catch(function (err) {
          console.log('ERR find google id : ', err);
          return err;
        });
      } else {
        // user already exists and is logged in, we have to link accounts
        var user = req.user; // pull the user out of the session

        user.updateGoogleInfos(googleEmail, googleName, googleId, googleToken).then(function (user) {
          return done(null, user, req.flash('info', 'Your google account is now linked'));
        }).catch(function (err) {
          console.log('ERR update google infos : ', err);
          return err;
        });
      }
    });
  }));
};