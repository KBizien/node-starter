// Modules
var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');

// Models
var models = require('../models');

//// ===============================================
// Route middleware to make sure a user is logged in
// =================================================
exports.isLoggedIn = function (req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();
  // if they aren't redirect them to the home page
  res.redirect('/');
};

//// ===============================================
// Unlink accounts
// =================================================

// unlink local method - remove email, username & password
exports.unlinkLocal = function (req, res) {
  var user = req.user;
  user.updateLoginInfos(null, null, null).then(function (user) {
    res.redirect('/users/profile');
  }).catch(function (err) {
    console.log('ERR unlink local : ', err);
    return err;
  });
};

// unlink facebook method - remove token
exports.unlinkFacebook = function (req, res) {
  var user = req.user;
  user.updateFacebookInfos(null, null, null, null).then(function (user) {
    res.redirect('/users/profile');
  }).catch(function (err) {
    console.log('ERR unlink Facebook : ', err);
    return err;
  });
};

// unlink google method - remove token
exports.unlinkGoogle = function (req, res) {
  var user = req.user;
  user.updateGoogleInfos(null, null, null, null).then(function (user) {
    res.redirect('/users/profile');
  }).catch(function (err) {
    console.log('ERR unlink google : ', err);
    return err;
  });
};

// unlink twitter method - remove token
exports.unlinkTwitter = function(req, res) {
  var user = req.user;
  user.updateTwitterInfos(null, null, null, null).then(function (user) {
    res.redirect('/users/profile');
  }).catch(function (err) {
    console.log('ERR unlink Twitter : ', err);
    return err;
  });
};

//// ===============================================
// Reset password - SendMail
// =================================================
exports.resetPassword = function (req, res) {
  async.waterfall([
    function (callback) {
      crypto.randomBytes(20, function (err, buf) {
        var token = buf.toString('hex');
        callback(null, token);
      });
    },
    function (token, callback) {
      models.User.findEmail(req.body.email).then(function (user) {
        if (!user) {
          req.flash('info', 'No account with that email address exists.');
          return res.render('pages/forgot', { message: req.flash('info') });
        } else {
          user.forgotPassword(token).then(function (user) {
            callback(null, token, user);
          }).catch(function (err) {
            console.log('ERR forgotPassword : ', err);
            return err;
          });
        }
      }).catch(function (err) {
        console.log('ERR findEmail : ', err);
        return err;
      });
    },
    function (token, user, callback) {
      var smtpTransport = nodemailer.createTransport({
        service: process.env.MAIL_SERVICE,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD
        }
      });
      var mailOptions = {
        from: process.env.MAIL_FROM,
        to: user.email,
        subject: 'Node Starter App Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/users/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function (err) {
        req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        callback(null, 'done');
      });
    }
  ], function (err, result) {
    if (err) {
      throw err;
    } else {
      res.render('pages/forgot.ejs', { message: req.flash('info') });
    }
  });
};

exports.matchToken = function (req, res) {
  models.User.matchToken(req.params.token).then(function (user) {
    if (!user) {
      req.flash('info', 'Password reset token is invalid or has expired.');
      return res.render('pages/forgot', { message: req.flash('info') });
    } else {
      res.render('pages/reset.ejs', { user: req.user, message: req.flash('info') });
    }
  }).catch(function (err) {
    console.log('ERR find user token : ', err);
    return err;
  });
};

exports.updatePassword = function (req, res) {
  async.waterfall([
    function (callback) {
      models.User.matchToken(req.params.token).then(function (user) {
        if (!user) {
          req.flash('info', 'Password reset token is invalid or has expired.');
          return res.render('pages/reset.ejs', { message: req.flash('info') });
        } else {
          if (req.body.password == req.body.confirm) {
            user.updatePassword(req.body.password).then(function (user) {
              callback(null, user);
            }).catch(function (err) {
              console.log('ERR update forgot password : ', err);
              return err;
            });

          } else {
            req.flash('info', 'Password & Password confirm are different. Please retry.');
            return res.render('pages/reset.ejs', { message: req.flash('info') });
          }
        }
      });
    },
    function (user, callback) {
      var smtpTransport = nodemailer.createTransport({
        service: process.env.MAIL_SERVICE,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD
        }
      });
      var mailOptions = {
        from: process.env.MAIL_FROM,
        to: user.email,
        subject: 'Node-Starter - Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('info', 'Success! Your password has been changed.');
        callback(null, 'done');
      });
    }
  ], function (err, result) {
    if (err) {
      throw err;
    } else {
      res.render('pages/index.ejs', { message: req.flash('info') });
    }
  });
};

//// ===============================================
// Change password
// =================================================
exports.changePassword = function (req, res, done) {
  var user = req.user;
  if (user.validPassword(req.body.password)) {
    if (req.body.newpassword == req.body.confirm) {
      user.updatePassword(req.body.newpassword).then(function (user) {
        return done(null, user, req.flash('info', 'Success! Your password has been changed.'));
      }).catch(function (err) {
        console.log('ERR update password : ', err);
        return err;
      });
    } else {
      return done(null, false, user, req.flash('info', 'Password & Password confirm are different. Please retry.'));
    }
  } else {
    return done(null, false, user, req.flash('info', 'This is not your actual password, please retry.'));
  }
}

//// ===============================================
// Delete user
// =================================================
exports.deleteAccount = function (req, res, done) {
  var user = req.user;
  user.destroyOne().then(function (user) {
    return done(null, false, req.flash('info', 'Your account is delete !'));
  }).catch(function (err) {
    console.log('ERR deleteAccount : ', err);
    return err;
  });
}