var mysql = require('mysql');

var connection;
var connection_close_wait = 500;
var timeout_id;

function getCredentials() {
	return {
		host: 'localhost',
		user: 'sessamekesh', // PUT YOUR USER HERE
		password: 'asdf', // PUT YOUR PASSWORD HERE
		database: 'tutor_queue'
	};
}

function owl_query(query_text, query_params, cb) {
	if (!connection) {
		connection = mysql.createConnection(getCredentials());
		connection.on('error', function () {});
	}

	connection.query(query_text, query_params, function (err, res) {
		cb(err, res);

		if (timeout_id) {
			clearTimeout(timeout_id);
		}

		timeout_id = setTimeout(function () {
			connection.end();
			connection = null;
			timeout_id = null;
		}, connection_close_wait);
	});
}

// EXPORTS HERE: