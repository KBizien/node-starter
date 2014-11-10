// load up the user model
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

  // =========================================
  // BOOTSTRAP PASSPORT LOCAL ===============
  // =========================================
  require('./strategies/local')(passport, models, User);

  // =========================================
  // BOOTSTRAP PASSPORT FACEBOOK ===============
  // =========================================
  require('./strategies/facebook')(passport, models, User, configAuth);

  // =========================================
  // BOOTSTRAP PASSPORT GOOGLE ===============
  // =========================================
  require('./strategies/google')(passport, models, User, configAuth);

  // =========================================
  // BOOTSTRAP PASSPORT TWITTER ===============
  // =========================================
  require('./strategies/twitter')(passport, models, User, configAuth);
};
