var UserModel = require('../models/users');
var usersController = {};

usersController.list = function (req, res, next) {
	UserModel.list(function (result) {
		res.render('users/list', {users: result, title: 'User List'});
	});
};

usersController.get = function (req, res, next) {

	UserModel.get(0, 100, function (statusCode, result) {
		res.statusCode = statusCode;
		res.json(result);
	});
};

module.exports = usersController;