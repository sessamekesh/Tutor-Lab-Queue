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
exports.registerTutor = function(name, callback) {
	owl_query('INSERT INTO tutor (name) VALUES (?);', [name], function (dberr, dbres) {
		if (dberr) {
			callback(dberr);
		} else {
			callback(null, { id: dbres.insertId, name: name });
		}
	});
};

exports.unregisterTutor = function(id, callback) {
	owl_query('DELETE FROM tutor WHERE id=? LIMIT 1;', callback);
};

exports.createHelpRequest = function(student_name, course, professor, topic, callback) {
	var le_time = (new Date()).getTime();
	owl_query(
		'INSERT INTO help (tutor_id, student_name, course, professor, topic, created_timestamp, resolved_timestamp) '
			+ 'VALUES (?, ?, ?, ?, ?, ?, ?);', [
				0,
				student_name,
				course,
				professor,
				topic,
				le_time,
				1
			], function (dberr, dbres) {
				callback(dberr, (!dberr) && {
					id: dbres.insertId,
					tutor_id: 0,
					student_name: student_name,
					course: course,
					professor: professor,
					topic: topic,
					created_timestamp: le_time,
					resolved_timestamp: 1
				}
			);
		}
	);
};

exports.getOpenHelpRequests = function (callback) {
	owl_query(
		'SELECT id, tutor_id, student_name, course, professor, topic, created_timestamp, resolved_timestamp FROM help WHERE tutor_id = 0 ORDER BY created_timestamp ASC;',
		[],
		function (dberr, dbres) {
			callback(dberr, dbres && dbres.map(function (row) {
				var tehDate = new Date(row['created_timestamp']);
				return {
					id: row['id'],
					student_name: row['student_name'],
					course: row['course'],
					professor: row['professor'],
					topic: row['topic'],
					created_date: tehDate.getHours() % 12 + ':' + ('00' + tehDate.getMinutes()).substr(-2)
				}
			}));
		}
	);
};

exports.markHelped = function (help_id, tutor_id, callback) {
	var le_time = (new Date()).getTime();
	owl_query(
		'UPDATE help SET resolved_timestamp = ?, tutor_id = ? WHERE id = ?;',
		[le_time, tutor_id, help_id],
		callback
	);
};