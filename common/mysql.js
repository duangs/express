var mysql = require('mysql');
var config = require('../config');
var connection = mysql.createPool(config.mysql);

module.exports = connection;