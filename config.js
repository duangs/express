const env = process.env.NODE_ENV || 'production';

var path = require('path');
var configFile = path.resolve('./configs', env + '.json');

var config = require(configFile);

module.exports = config