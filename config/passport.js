// load strategies modules
var LocalStrategy   = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
// load up the user model
var Sequelize = require("sequelize");
var models = require('../models');
var User = models.sequelize.import('../../../models/user');

// load the auth variables
var configAuth = require('./env/'+ process.env.NODE_ENV + '.js');

// expose this function to our app using module.exports
module.exports = function(passport) {

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.find({where: {id: id}}).success(function(user){
      done(null, user);
    }).error(function(err){
      done(err, null);
    });
  });

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================

  passport.use('local-login', new LocalStrategy({
      usernameField : 'username',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, username, password, done) { // callback with email and password from our form

      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOne({ where: { username: username }}).success(function(user) {
        if (!user) {
          console.log('Unknown user');
          return done(null, false, req.flash('error', 'Unknown user'));
        } else if (!User.build().validPassword(password, user)) {
          console.log('Invalid password');
          return done(null, false, req.flash('error', 'Invalid password'));
        } else {
          console.log('Welcome '+ user.username);
          return done(null, user);
        }
      }).error(function(err){
        return done(err);
      });

  }));

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================

  passport.use('local-signup', new LocalStrategy({
      usernameField : 'username',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, username, password, done) {
      // asynchronous
      // User.findOne wont fire unless data is sent back
      process.nextTick(function() {
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ where: Sequelize.or({ username:  username }, { email: req.body.email })}).success(function(user) {
            // check to see if theres already a user with that email
            if (user) {
                console.log('That email or username have already an account');
                return done(null, false, req.flash('error', 'That email or username have already an account'));
            } else {
              // if there is no user with that email & username
              // save the user
              User
                .create({
                  username: username,
                  email: req.body.email,
                  password: User.build().generateHash(password)
                })
                .complete(function(err, user) {
                  if (err)
                    throw err;
                  return done(null, user);
                })
            }
        });
      });
  }));

  // =========================================================================
  // FACEBOOK SIGNUP/SIGNIN ============================================================
  // =========================================================================

  passport.use(new FacebookStrategy({
    // pull in our app id and secret from our auth.js file
    clientID        : configAuth.facebookAuth.clientID,
    clientSecret    : configAuth.facebookAuth.clientSecret,
    callbackURL     : configAuth.facebookAuth.callbackURL
  },

  // facebook will send back the token and profile
  function(token, refreshToken, profile, done) {

    // asynchronous
    process.nextTick(function() {

      // find the user in the database based on their facebook id
      User.findOne({where: { facebookId : profile.id }}).success(function(user) {
        if (user) {
          return done(null, user); // user found, return that user
        } else {
          User
            .create({
              facebookEmail: profile.emails[0].value, // facebook can return multiple emails so we'll take the first
              facebookName: profile.name.givenName + ' ' + profile.name.familyName,
              facebookId: profile.id, // set the users facebook id
              facebookToken: token // // we will save the token that facebook provides to the user
            })
            .complete(function(err, user) {
              if (err)
                throw err;
              return done(null, user);
            })
        }
      });
    });
  }));

  // =========================================================================
  // GOOGLE SIGNUP/SIGNIN ====================================================
  // =========================================================================
  passport.use(new GoogleStrategy({
    clientID        : configAuth.googleAuth.clientID,
    clientSecret    : configAuth.googleAuth.clientSecret,
    callbackURL     : configAuth.googleAuth.callbackURL,
  },
  function(token, refreshToken, profile, done) {
    // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Google
    process.nextTick(function() {
      // try to find the user based on their google id
      User.findOne({where: { googleId : profile.id }}).success(function(user) {
        if (user) {
          return done(null, user); // user found, return that user
        } else {
          // if the user isnt in our database, create a new user
          User
            .create({
              googleEmail: profile.emails[0].value, // google can return multiple emails so we'll take the first
              googleName: profile.displayName,
              googleId: profile.id, // set the users google id
              googleToken: token // we will save the token that google provides to the user
            })
            .complete(function(err, user) {
              if (err)
                throw err;
              return done(null, user);
            })
        }
      });
    });
  }));

  // =========================================================================
  // TWITTER SIGNUP/SIGNIN ===================================================
  // =========================================================================
  passport.use(new TwitterStrategy({
    consumerKey     : configAuth.twitterAuth.consumerKey,
    consumerSecret  : configAuth.twitterAuth.consumerSecret,
    callbackURL     : configAuth.twitterAuth.callbackURL
  },
  function(token, tokenSecret, profile, done) {
  // make the code asynchronous
  // User.findOne won't fire until we have all our data back from Twitter
    process.nextTick(function() {
      User.findOne({where: { twitterId : profile.id }}).success(function(user) {
        if (user) {
          return done(null, user); // user found, return that user
        } else {
          // if the user isnt in our database, create a new user
          User
            .create({
              twitterUsername: profile.username, // google can return multiple emails so we'll take the first
              twitterDisplayName: profile.displayName,
              twitterId: profile.id, // set the users google id
              twitterToken: token // we will save the token that google provides to the user
            })
            .complete(function(err, user) {
              if (err)
                throw err;
              return done(null, user);
            })
        }
      });
    });
  }));
};
