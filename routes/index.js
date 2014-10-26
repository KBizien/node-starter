var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  models.User.findAll({
    include: [ models.Event ]
  }).success(function(users) {
    res.render('index', {
      title: 'Express',
      users: users
    });
  });
});

module.exports = router;
