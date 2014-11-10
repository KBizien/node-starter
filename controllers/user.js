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