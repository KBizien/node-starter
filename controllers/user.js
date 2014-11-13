var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');
// load up the user model
var Sequelize = require("sequelize");
var models = require('../models');
var User = models.sequelize.import('../../../models/user');

//route middleware to make sure a user is logged in
exports.isLoggedIn = function(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();
  // if they aren't redirect them to the home page
  res.redirect('/');
};

// unlink local method - remove email, username & password
exports.unlinkLocal = function(req, res) {
  var user = req.user;
  user
    .updateAttributes({
      username: null,
      email: null,
      password: null
    })
    .complete(function(err, user) {
      if (err)
        throw err;
      res.redirect('/users/profile');
    })
};

// unlink facebook method - remove token
exports.unlinkFacebook = function(req, res) {
  var user = req.user;
  user
    .updateAttributes({
      facebookToken: null,
    })
    .complete(function(err, user) {
      if (err)
        throw err;
      res.redirect('/users/profile');
    })
};

// unlink google method - remove token
exports.unlinkGoogle = function(req, res) {
  var user = req.user;
  user
    .updateAttributes({
      googleToken: null,
    })
    .complete(function(err, user) {
      if (err)
        throw err;
      res.redirect('/users/profile');
    })
};

// unlink twitter method - remove token
exports.unlinkTwitter = function(req, res) {
  var user = req.user;
  user
    .updateAttributes({
      twitterToken: null,
    })
    .complete(function(err, user) {
      if (err)
        throw err;
      res.redirect('/users/profile');
    })
};

// Reset password - SendMail
exports.resetPassword = function(req, res) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({where: { email: req.body.email }}).success(function(user) {
        if (!user) {
          req.flash('info', 'No account with that email address exists.');
          return res.render('pages/forgot', { message: req.flash('info') });
        }

        user
          .updateAttributes({
            resetPasswordToken: token,
            resetPasswordExpires: Date.now() + 3600000 // 1 hour
          })
          .complete(function(err, user) {
            if (err)
              throw err;
            done(err, token, user);
          })
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Your_service',
        auth: {
          user: 'user_email',
          pass: 'user_password'
        }
      });
      var mailOptions = {
        from: 'from_email',
        to: user.email,
        subject: 'Node Starter App Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/users/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err)
      throw err;
    res.render('pages/forgot.ejs', { message: req.flash('info') });
  });
};

// Reset password - Match token
exports.matchToken = function(req, res) {
  User.findOne({where: Sequelize.and({ resetPasswordToken: req.params.token }, { resetPasswordExpires: { gt: Date.now() }} ) }).success(function(user) {
    if (!user) {
      req.flash('info', 'Password reset token is invalid or has expired.');
      return res.render('pages/forgot', { message: req.flash('info') });
    }
    res.render('pages/reset.ejs', { user: req.user, message: req.flash('info') });
  });
};

// Update Password
exports.updatePassword = function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ where: Sequelize.and({ resetPasswordToken: req.params.token }, { resetPasswordExpires: { gt: Date.now() }})}).success(function(user) {
        if (!user) {
          req.flash('info', 'Password reset token is invalid or has expired.');
          return res.render('pages/reset.ejs', { message: req.flash('info') });
        }

        user
          .updateAttributes({
            password: User.build().generateHash(req.body.password),
            resetPasswordToken: null,
            resetPasswordExpires: null
          })
          .complete(function(err, user) {
            if (err)
              throw err;
            done(err, user);
          })
      });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Your_service',
        auth: {
          user: 'user_email',
          pass: 'user_password'
        }
      });
      var mailOptions = {
        from: 'from_email',
        to: user.email,
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('info', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
    res.render('pages/index.ejs', { message: req.flash('info') });
  });
};