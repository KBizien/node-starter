//var express = require('express');
//var router = express.Router();
//svar passport = require('passport');

module.exports = function(app, passport) {
  /* GET home page. */
  app.get('/', function(req, res) {
    console.log(req.flash('succes'));
    res.render('index', { title: 'Express', success: req.flash('success') });
  });

  app.get('/login', function(req, res) {
    console.log(req.flash('error'));
    res.render('login', { title: 'Login', error: req.flash('error') });
  });

  app.post('/login',
    passport.authenticate('local-signin', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true,
      successFlash: true
    })
  );
};

//module.exports = router;
