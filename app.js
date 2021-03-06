var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');
var session = require('express-session');

var config = require('./config');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser(config.secret));
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

if (config.redis) {
	var redisClient;
	var redis = require('redis');
	var IoRedis = require('ioredis');
	var RedisStore = require('connect-redis')(session);
	if (config.redis.mode == 'fork') {
		redisClient = redis.createClient(config.redis.node);
	} else {
		redisClient = new IoRedis.Cluster(config.redis.node);
	}
	app.use(session({
		secret: config.secret,
		resave: false,
		store: new RedisStore({prefix: 'express:app:{basic}.', client: redisClient})
	}));
}else{
	app.use(session({
		secret: config.secret,
		resave: false
	}));
}

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
