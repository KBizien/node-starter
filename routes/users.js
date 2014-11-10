var express = require('express');
var router = express.Router();
var passport = require('passport');

// =====================================
// LOGIN PAGE ==========================
// =====================================
// show the login form
router.get('/login', function(req, res) {
  var error = req.flash('error');
  console.log(error);
  res.render('pages/login.ejs', { message: error });
});

// process the login form
router.post('/login',
  passport.authenticate('local-login', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/login',
    failureFlash: true,
    successFlash: true
  })
);

// =====================================
// SIGNUP PAGE =========================
// =====================================
// show the signup form
router.get('/signup', function(req, res) {
  // render the page and pass in any flash data if it exists
  res.render('pages/signup.ejs', { message: req.flash('signupMessage') });
});

// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/users/profile',
  failureRedirect : '/users/signup',
  failureFlash : true
}));

// =====================================
// FACEBOOK ROUTES =====================
// =====================================
// route for facebook authentication and login
router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect : '/users/profile',
    failureRedirect : '/'
}));

// =====================================
// GOOGLE ROUTES =======================
// =====================================
// send to google to do the authentication
// profile gets us their basic information including their name
// email gets their emails
router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

// the callback after google has authenticated the user
router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect : '/users/profile',
    failureRedirect : '/'
}));

// =====================================
// TWITTER ROUTES ======================
// =====================================
// route for twitter authentication and login
router.get('/auth/twitter', passport.authenticate('twitter'));

// handle the callback after twitter has authenticated the user
router.get('/auth/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect : '/users/profile',
    failureRedirect : '/'
}));

// =====================================
// PROFILE SECTION =====================
// =====================================
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
router.get('/profile', isLoggedIn, function(req, res) {
  res.render('pages/profile.ejs', {
      user : req.user // get the user out of session and pass to template
  });
});

// =====================================
// LOGOUT ==============================
// =====================================
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

// locally --------------------------------
router.get('/connect/local', function(req, res) {
  res.render('pages/connect-local.ejs', { message: req.flash('loginMessage') });
});
router.post('/connect/local', passport.authenticate('local-signup', {
  successRedirect : '/users/profile', // redirect to the secure profile section
  failureRedirect : '/users/connect/local', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

// facebook -------------------------------
// send to facebook to do the authentication
router.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

// handle the callback after facebook has authorized the user
router.get('/connect/facebook/callback',
  passport.authorize('facebook', {
    successRedirect : '/users/profile',
    failureRedirect : '/'
}));

// twitter --------------------------------
// send to twitter to do the authentication
router.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

// handle the callback after twitter has authorized the user
router.get('/connect/twitter/callback',
  passport.authorize('twitter', {
    successRedirect : '/users/profile',
    failureRedirect : '/'
}));

// google ---------------------------------
// send to google to do the authentication
router.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

// the callback after google has authorized the user
router.get('/connect/google/callback',
  passport.authorize('google', {
    successRedirect : '/users/profile',
    failureRedirect : '/'
}));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

// local -----------------------------------
router.get('/unlink/local', function(req, res) {
  var user = req.user;
  console.log(user);
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
});

// facebook -------------------------------
router.get('/unlink/facebook', function(req, res) {
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
});

// twitter --------------------------------
router.get('/unlink/twitter', function(req, res) {
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
});

// google ---------------------------------
router.get('/unlink/google', function(req, res) {
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
});

//route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();
  // if they aren't redirect them to the home page
  res.redirect('/');
}

module.exports = router;