'use strict';

const express = require('express');
const httpError = require('http-errors');
const User = require('../entities/user');
/*
(async () => {
    await User.upsert({
        id: 2,
        username: 'user 1->4',
        changedPasswordDate: new Date()
    });
    await User.upsert({
        username: 'user 3',
        changedPasswordDate: new Date()
    });
})();
*/
/*
const username = 'user3';
User.setPassword(username, '222', '66666')
    .then(d => console.log(username, d))
    .catch(e => console.log(username, e));
User.login(username, '66666')
    .then(d => console.log(username, d))
    .catch(e => console.log(username, e));
*/

//
// init Router for all /api/ requests
//
const router = express.Router();


// middleware that is specific to this router
/*router.use(function(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});*/

router.get('/login/:username/:password', function(req, res, next) {
    User.login(req.params.username, req.params.password)
        .then(user => {
            req.session.userId = user.id;
            res.send(user);
        })
        .catch(next);
});

router.get('/users', function(req, res, next) {
    User.findAll()
        .then(res.send.bind(res))
        .catch(next);
});

router.get('/user/:id', function(req, res, next) {
    User.findByPk(req.params.id)
        .then(res.send.bind(res))
        .catch(next);
});

// 404 for api
router.use(function(req, res, next) {
    next(httpError(404));
});


module.exports = router;