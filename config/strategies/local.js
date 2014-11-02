var models = require('../../models');
var LocalStrategy = require('passport-local').Strategy;
var User = models.sequelize.import('../../../models/user');

module.exports = function(passport) {
  passport.use('local-signin',new LocalStrategy({
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {
      User.findOne({ where: { username: username }}).success(function(user) {
        if (!user) {
          console.log('Unknown user');
          return done(null, false, req.flash('error', 'Unknown user'));
        } else if (password != user.password) {
          console.log('Invalid password');
          return done(null, false, req.flash('error', 'Invalid password'));
        } else {
          console.log('Welcome '+ user.username);
          return done(null, user, req.flash('success', 'Welcome !'));
        }
      }).error(function(err){
        return done(err);
      });
    }
  ));
};
