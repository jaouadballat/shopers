'use strict';

const dotenv = require('dotenv').load();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Store = require('connect-mongo')(session);
const db = require('./api/model/db');

const api = require('./api/routes/index');
const index = require('./routes/index');
const favorit = require('./routes/favorit');
const login = require('./routes/login');
const signup = require('./routes/signup');

const app = express();

//app.use(cookieParser());
app.use(session({
	secret: 'keyboard cat',
	resave: true,
	saveUninitialized: false,
	cookie: { domain: '' },
	store: new Store({
		mongooseConnection: db
	})
}));
app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('x-powered-by', false);

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);
app.use('/favorit', favorit);
app.use('/login', login);
app.use('/signup', signup);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
