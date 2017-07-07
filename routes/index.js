var express = require('express');
var router = express.Router();
var Filter = require('./filter');

/* GET home page. */
router.get('/', [Filter.checkLogin], function (req, res) {
	res.render('index', {title: 'Express'});
});

router.get('/login', function (req, res) {
	var referer = false;
	if(req.headers.referer){
		referer = req.headers.referer;
	}
	var error = req.session.loginError;
	req.session.loginError = null;
	req.session.loginReferer = referer;
	res.render('login', {error: error});
});

router.post('/login', function (req, res) {
	var user = {
		uid: 1,
		username: 'admin',
		password: '111111'
	};

	if (req.body.username == user.username && req.body.password == user.password) {
		req.session._session_user = user;
		res.cookie('__u', user.uid, {expires: new Date(Date.now() + (1 * 24 * 3600 * 1000)), httpOnly: true, signed: true});
		if (req.session.loginReferer) {
			var referer = req.session.loginReferer;
			req.session.loginReferer = false;
			res.redirect(referer);
		} else {
			res.redirect('/');
		}
	} else {
		req.session.loginError = true;
		res.redirect('/login');
	}

});

router.get('/logout', [Filter.checkLogin], function (req, res) {
	req.session.destroy(function () {
		
	});
	res.cookie('__u', false, {expires: new Date(Date.now() - 10), httpOnly: true});
	res.redirect('/');
});

module.exports = router;
