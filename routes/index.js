var express = require('express');
var router = express.Router();
var passport = require('passport');

// =====================================
// HOME PAGE ===========================
// =====================================
router.get('/', function(req, res) {
  res.render('pages/index.ejs');
});

module.exports = router;