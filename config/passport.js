// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
// load up the user model
var models = require('../models');
var User = models.sequelize.import('../../../models/user');

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
    db.User.find({where: {id: id}}).success(function(user){
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
          return done(null, user, req.flash('success', 'Welcome !'));
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
        User.findOne({ where:{ username:  username }}).success(function(user) {
            // check to see if theres already a user with that email
            if (user) {
                console.log('That username is already taken');
                return done(null, false, req.flash('error', 'That username is already taken.'));
            } else {
              // if there is no user with that username
              // save the user
              User
                .create({
                  username: username,
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
};
