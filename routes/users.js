var models  = require('../models');
var express = require('express');
var router = express.Router();

router.post('/create', function(req, res) {
  models.User.create({
    username: req.param('username')
  }).success(function() {
    res.redirect('/');
  });
});

router.post('/:user_id/events/create', function (req, res) {
  models.User.find({
    where: { id: req.param('user_id') }
  }).success(function(user) {
    models.Event.create({
      title: req.param('title')
    }).success(function(title) {
      title.setUser(user).success(function() {
        res.redirect('/');
      });
    });
  });
});

router.get('/:user_id/events/:event_id/destroy', function (req, res) {
  models.User.find({
    where: { id: req.param('user_id') }
  }).success(function(user) {
    models.Event.find({
      where: { id: req.param('event_id') }
    }).success(function(event) {
      task.setUser(null).success(function() {
        event.destroy().success(function() {
          res.redirect('/');
        });
      });
    });
  });
});


module.exports = router;