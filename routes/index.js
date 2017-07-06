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
	console.log(req.headers);
	var user = {
		uid: 1,
		username: 'admin',
		password: '111111'
	};

	if (req.body.username == user.username && req.body.password == user.password) {
		req.session.user = user;
		res.cookie('__u', user.uid, {expires: new Date(Date.now() + (1 * 24 * 60 * 60 * 1000)), httpOnly: true});
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
	res.cookie('__u', false, {expires: new Date(Date.now() - 10), httpOnly: true});
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;
