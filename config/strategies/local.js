// Models
var models = require('../../models');

// Modules
var LocalStrategy   = require('passport-local').Strategy;

// expose this function to our app using module.exports
module.exports = function(passport, flash) {

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================

  passport.use('local-login', new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  }, function (req, username, password, done) { // callback with email and password from our form

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    models.User.findForLogin(username).then(function (user) {
      if (!user) {
        console.log('Unknown user');
        return done(null, false, req.flash('info', 'Unknown user'));
      } else if (!user.validPassword(password)) {
        console.log('Invalid password');
        return done(null, false, req.flash('info', 'Invalid password'));
      } else {
        console.log('Welcome '+ user.username);
        return done(null, user, req.flash('info', 'Hello '+ user.username));
      }
    }).catch(function (err){
      console.log('ERR login : ', err);
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
  }, function (req, username, password, done) {
    // asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(function() {

      // find a user whose username or email is the same as the forms fields
      // we are checking to see if the user trying to login already exists
      models.User.findForSignin(username, req.body.email).then(function (existingUser) {
        // check to see if theres already a user with that email
        if (existingUser) {
          console.log('That email or username have already an account');
          return done(null, false, req.flash('info', 'That email or username have already an account'));
        }

        // If we're logged in, we're connecting a new local account.
        if (req.user) {
          var user = req.user;
          user.updateLoginInfos(username, req.body.email, password).then(function (user) {
            return done(null, user, req.flash('info', 'Local account linked'));
          }).catch(function (err) {
            console.log('ERR Login update : ', err);
            return err;
          });
        } else {
          // if there is no user with that email & username
          // save the user

          models.User.createOneLocal(username, req.body.email, password).then(function (user) {
            return done(null, user, req.flash('info', 'Welcome '+ user.username));
          }).catch(function (err) {
            console.log('ERR Signup : ', err);
            return err;
          });
        }
      }).catch(function (err) {
        console.log('ERR find for signin : ', err);
        return err;
      });
    });
  }));
};