var request = require('request');
var extend = require('util')._extend;
var httpClient = {};
/**
 * getJSON:  REST get request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 */
httpClient.getJSON = function (options, callback) {
	request.get(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			callback(response.statusCode, JSON.parse(body))
		}
	})
};

module.exports = httpClient;