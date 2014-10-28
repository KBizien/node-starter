var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/login', function(req, res) {
  res.render('login', { title: 'Login' });
});

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
);

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
