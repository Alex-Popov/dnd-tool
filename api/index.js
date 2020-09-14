'use strict';

const express = require('express');
const httpError = require('http-errors');
const { OperationResults, promiseHandler } = require('./operation-results');
const { authenticate, logout, authorizeMiddlewareFactory } = require('auth');

const User = require('../entities/user');



//
// permission checkers
//
const mustAuthenticated = authorizeMiddlewareFactory(),
      isAdmin = authorizeMiddlewareFactory('admin');


//
// init Router for all /api/ requests
//
const router = express.Router();


//
// login/
//
router.post('/login', (req, res) => {
    User.findByUsernameAndPassword(req.body.username, req.body.password)
        .then(async user => {
            if (user) {
                await authenticate(req.session, user);
                return new OperationResults(true, 'You\'ve logged in successfully');
            } else {
                return new OperationResults(false, 'Invalid username or password');
            }
        })
        .catch(promiseHandler)
        .then(res.send.bind(res));
});

router.all('/logout', (req, res) => {
    logout(req.session)
        .then(() => {
            return new OperationResults(true, 'You\'ve logged out in successfully');
        })
        .catch(promiseHandler)
        .then(res.send.bind(res));
});


//
// user/
//
router.get('/users', mustAuthenticated, (req, res) => {
    User.findAll()
        .then(promiseHandler)
        .catch(promiseHandler)
        .then(res.send.bind(res));
});

router.get('/user/:id', isAdmin, (req, res) => {
    User.findByPk(req.params.id)
        .then(promiseHandler)
        .catch(promiseHandler)
        .then(res.send.bind(res));
});


//
// api/* - 404
//
router.use((req, res, next) => {
    next(httpError(404));
});






module.exports = router;