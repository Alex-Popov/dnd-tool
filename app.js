'use strict';

const config = require('config');
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const logger = require('logger');
const bunyanMiddleware = require('bunyan-middleware');
const session = require('express-session');
const cookieParser = require('cookie-parser');
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


api.use(function(req, res, next) {
    console.log('userId', req.session.user ? req.session.user.id : '');
    next();
});


// api routs
app.use('/api', api);

// all other routs to index
app.use((req, res, next) => {
    res.render('index');
});



// error handler
app.use((err, req, res, next) => {
//    if (!res.headersSent) {
    res.status(err.status || 500);
    res.send(typeof err === 'string' ? err : err.message);
});

module.exports = app;
