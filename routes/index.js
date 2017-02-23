var express = require('express');
var tracks = require('../models/users.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});

module.exports = router;
