var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users');
var Filter = require('./filter');

/* GET users listing. */
router.get('/', [Filter.checkLogin], function (req, res, next) {
	res.send('respond with a resource');
});

router.get('/list', [Filter.checkLogin], usersController.list);
router.get('/get', [Filter.checkLogin], usersController.get);

router.get("/test/:id(\\d+)/:b", [Filter.checkLogin], function (req, res, next) {
	res.send(req.query);
	res.send(req.params);
});

module.exports = router;
