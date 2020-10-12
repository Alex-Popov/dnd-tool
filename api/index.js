'use strict';

const express = require('express');
const httpError = require('http-errors');

const OperationResults = require('./operation-results');
const { authenticate, logout, authorizeMiddlewareFactory } = require('auth');

const { User, ROLE_ADMIN, ROLE_USER } = require('../entities/user');

/*
(async () => {
    try {
        await User.create({
            username: 'user2',
            password: '111',
            role: ROLE_USER
        });
    } catch (e) {
        console.log(e);
    }
})();
*/
/*
User.setPassword('admin', '', 'sdfcvb3613').then();
User.setPassword('user1', '', '111').then();
*/

//
// permission checkers
//
const mustAuthenticated = authorizeMiddlewareFactory(),
      isAdmin = authorizeMiddlewareFactory(ROLE_ADMIN);


//
// helpers
//
const clientSessionWrapper = (session) => ({
    sessionId: session.id,
    userId: session.user.id,
    userRole: session.user.role
});

const promiseHandler = (isSuccessful, messages, data) => {
    // only first argument provided - Promise case
    if (messages === undefined && data === undefined) {
        // error, no messages, error = isSuccessful - .catch() case
        if (isSuccessful instanceof Error) {
            return new OperationResults(false, isSuccessful.message);

            // success, no messages, data = isSuccessful - .then() case
        } else {
            return new OperationResults(true, '', isSuccessful);
        }

        // All arguments provided, manual creation case
    } else {
        return new OperationResults(isSuccessful, messages, data);
    }
}

const bindDataToRes = (res, dataProviderPromise) => {
    dataProviderPromise
        .then(promiseHandler, promiseHandler)
        .then(res.send.bind(res));
}


//
// init Router for all /api/ requests
//
const router = express.Router();


// auth/

router.get('/auth/autoLogin', mustAuthenticated, (req, res) => res.send(
    new OperationResults(true, '', clientSessionWrapper(req.session))
));
router.post('/auth/login', (req, res) => bindDataToRes(res,
    User.findByUsernameAndPassword(req.body.username, req.body.password)
        .then(async user => {
            await authenticate(req.session, user);
            return clientSessionWrapper(req.session);
        })
));
router.all('/auth/logout', (req, res) => bindDataToRes(res,
    logout(req.session)
));
router.post('/auth/changePassword', mustAuthenticated, (req, res) => bindDataToRes(res,
    User.setPassword(req.session.user.username, req.body.oldPassword, req.body.newPassword)
));



// user/

router.get('/user/getAll', isAdmin, (req, res) => bindDataToRes(res,
    User.findAll()
));
router.get('/user/getById', isAdmin, (req, res) => bindDataToRes(res,
    User.findByPk(req.query.id)
));
router.get('/user/getCurrent', mustAuthenticated, (req, res) => bindDataToRes(res,
    User.findByPk(req.session.user.id)
));



// api/* - 404

router.use((req, res, next) => {
    next(httpError(404));
});



module.exports = router;