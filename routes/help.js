var express = require('express');
var router = express.Router();

var PageModel = require('../models/page').PageModel;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('help', new PageModel('fulfill', 'Make new request', {}));
});

module.exports = router;
