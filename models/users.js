var mysqlConnection = require('../common/mysql');
var httpClient = require('../common/httpclient');
var User = {};

User.list = function (_callback) {
	mysqlConnection.query("select host, user, password from user", {}, function (err, result, fields) {
		if (err) throw err;
		_callback(result);
	});
};

User.get = function (offset, limit, _callback) {
	var option = {
		baseUrl: 'http://192.168.100.34:17081/datasupply',
		url: '/news/pdf/html/list',
		qs: {offset: offset || 0, limit: limit || 20},
		method: 'GET'
	};

	httpClient.getJSON(option, _callback);
};

User.getUserById = function (Id) {
	return {
		uid: 1,
		username: 'admin',
		passwrod: '111111'
	};
};

module.exports = User;