var models = require('../../models');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = models.sequelize.import('../../../models/user');

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ where: { username: username }}).success(function(user) {
      if (!user) {
        console.log('Unknown user');
        return done(null, false, { message: 'Unknown user' });
      } else if (password != user.password) {
        console.log('Invalid password');
        return done(null, false, { message: 'Invalid password'});
      } else {
        console.log('Welcome '+ user.username);
        return done(null, user, { message: 'Welcome !'});
      }
    }).error(function(err){
      return done(err);
    });
  }
));
