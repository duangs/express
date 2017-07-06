var Users = require('../models/users');
var Filter = {};

Filter.checkLogin = function (req, res, next) {
	if(!req.session.user || req.session.user == 'undefined'){
		if(!req.cookies.__u || req.cookies.__u == 'undefined') {
			res.redirect('/login');
			return false;
		}

		req.session.user = Users.getUserById(req.cookies.__u);
	}

	next();
};

module.exports = Filter;