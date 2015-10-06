var express = require('express');
var router = express.Router();

var dao = require('../dao/generic_dao');

/* POST result */
router.post('/', function (req, res) {

	console.log('Data received:', req.body);

	// See this? No security. The only client will be in the tutor lab, closely monitored by yours truly.
	dao.createHelpRequest(req.body.studentName || '1337 hacker', req.body.className || 'Very clever. Pat yourself on the back.', req.body.professor, req.body.topic, function (dberr, dbres) {
		if (dberr) {
			console.log('Error inserting the data!', dberr);
			res.status(500).json({'error': 'Could not insert data! Check server logs'});
		} else {
			console.log('No error inserting the data!');
			res.status(200).json({'entry_time': (new Date()).getTime()});
		}
	});
});

router.get('/', function (req, res) {
	dao.getOpenHelpRequests(function (dberr, dbres) {
		if (dberr) {
			console.log('Error getting help requests!', dberr);
			res.status(500).json({'error': 'Could not get data! See logs'});
		} else {
			console.log('No error retrieving data');
			res.status(200).json(dbres);
		}
	});
});

module.exports = router;