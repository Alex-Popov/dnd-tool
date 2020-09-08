'use strict';

const config = require('config');
const path = require('path');
const logger = require('logger');
const bunyanMiddleware = require('bunyan-middleware');
const express = require('express');
const httpError = require('http-errors');
const cookieParser = require('cookie-parser');
//const cookieSession = require('cookie-session');
const session = require('express-session');
const helmet = require('helmet');

const api = require('api');


//
// init Express
//
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'html'));
app.set('view engine', 'vash');

// middleware functions
app.use(helmet());
app.use(bunyanMiddleware({logger}));

// static
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static('uploads'));
//app.use(express.static('files'));

// data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// session
app.use(cookieParser());
app.use(session({
    key: 'sid',
    secret: config.COOKIE_SECRET,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
        maxAge: config.SESSION_AGE,
        httpOnly: true
    }
}));

app.use(function(req, res, next) {
    console.log('userId', req.session.userId+'');
    next();
});


// api routs
app.use('/api', api);

// all other routs to index
app.use(function(req, res, next) {
    res.render('index');
});



// error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: (config.IS_PROD ? {} : err)
    });
});

module.exports = app;
