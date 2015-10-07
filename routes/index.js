var express = require('express');
var router = express.Router();

var PageModel = require('../models/page').PageModel;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('request', new PageModel('request', 'Make new request', {}));
});

router.post('/', function (req, res) {
  res.render('request', new PageModel('request', 'Make new request', { requestMade: true }));
});

module.exports = router;
