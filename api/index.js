'use strict';

const express = require('express');
const httpError = require('http-errors');
const { OperationResults, promiseHandler } = require('./operation-results');
const { authenticate, logout, authorizeMiddlewareFactory } = require('auth');

const User = require('../entities/user');

/*User.setPassword('admin', '', 'sdfcvb3613').then();
User.setPassword('user1', '', '111').then();
User.setPassword('user2', '', '111').then();
User.setPassword('user3', '', '111').then();*/

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
// auth/
//
router.post('/auth/login', (req, res) => {
    User.findByUsernameAndPassword(req.body.username, req.body.password)
        .then(async user => {
            await authenticate(req.session, user);
            return new OperationResults(true, 'You\'ve logged in successfully', {
                sessionId: req.session.id,
                userId: req.session.user.id
            });
        })
        .catch(promiseHandler)
        .then(res.send.bind(res));
});
router.all('/auth/logout', (req, res) => {
    logout(req.session)
        .then(() => new OperationResults(true, 'You\'ve logged out successfully'))
        .catch(promiseHandler)
        .then(res.send.bind(res));
});
router.post('/auth/changePassword', mustAuthenticated, (req, res) => {
    User.setPassword(req.session.user.username, req.body.oldPassword, req.body.newPassword)
        .then(() => new OperationResults(true, 'Your password have been changed successfully'))
        .catch(promiseHandler)
        .then(res.send.bind(res));
});
router.get('/auth/autoLogin', mustAuthenticated, (req, res) => {
    res.send(
        new OperationResults(true, '', {
            sessionId: req.session.id,
            userId: req.session.user.id
        })
    );
});



//
// user/
//
router.get('/user/getAll', isAdmin, (req, res) => {
    User.findAll()
        .then(promiseHandler)
        .catch(promiseHandler)
        .then(res.send.bind(res));
});

router.get('/user/getById', isAdmin, (req, res) => {
    User.findByPk(req.query.id)
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