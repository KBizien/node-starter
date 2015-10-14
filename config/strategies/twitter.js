// load strategies modules
var TwitterStrategy  = require('passport-twitter').Strategy;

// Models
var models = require('../../models');

// expose this function to our app using module.exports
module.exports = function(passport, flash) {

  // =========================================================================
  // TWITTER SIGNUP/SIGNIN ===================================================
  // =========================================================================
  passport.use(new TwitterStrategy({
    consumerKey     : process.env.TWITTER_AUTH_CONSUMER_KEY,
    consumerSecret  : process.env.TWITTER_AUTH_CONSUMER_SECRET,
    callbackURL     : process.env.TWITTER_AUTH_CALLBACK_URL,
    passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
  },
  function (req, token, tokenSecret, profile, done) {
  // asynchronous

  var twitterId = profile.id;
  var twitterUsername = profile.username;
  var twitterDisplayName = profile.displayName;
  var twitterToken = token;

  // User.findOne won't fire until we have all our data back from Twitter
    process.nextTick(function () {
      if (!req.user) {
        models.User.findTwitterId(twitterId).then(function (user) {
          if (user) {
            // if there is a user id already but no token
            // just add our token and profile information
            if (!user.twitterToken) {
              user.updateTwitterInfos(twitterUsername, twitterDisplayName, twitterId, twitterToken).then(function (user) {
                return done(null, user, req.flash('info', 'Hello ' + user.twitterUsername + ', your twitter account is now linked'));
              }).catch(function (err) {
                console.log('ERR twitter update infos : ', err);
                return err;
              });
            }
            return done(null, user, req.flash('info', 'Hello ' + user.twitterUsername)); // user found, return that user
          } else {
            // if the user isnt in our database, create a new user
            models.User.createOneTwitter(twitterUsername, twitterDisplayName, twitterId, twitterToken).then(function (user) {
              return done(null, user, req.flash('info', 'Welcome ' + user.twitterUsername));
            }).catch(function (err) {
              console.log('ERR create twitter : ', err);
              return err;
            });
          }
        }).catch(function (err) {
          console.log('ERR find twitter id : ', err);
          return err;
        });
      } else {
        // user already exists and is logged in, we have to link accounts
        var user = req.user; // pull the user out of the session

        user.updateTwitterInfos(twitterUsername, twitterDisplayName, twitterId, twitterToken).then(function (user) {
          return done(null, user, req.flash('info', 'Your twitter account is now linked'));
        }).catch(function (err) {
          console.log('ERR update twitter infos : ', err);
          return err;
        });
      }
    });
  }));
};