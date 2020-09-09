'use strict';

const httpError = require('http-errors');



const authenticate = async (session, user) => {
    if (!session || !user) throw new Error('Invalid session or user data');

    session.user = user;
    return;
}

const logout = (session) => {
    return new Promise((resolve, reject) => {
        if (!session) reject('Invalid session data');

        session.destroy(error => {
            if (error) reject(error);
            resolve();
        });
    });
}

const authorizeMiddlewareFactory = (roles) => {
    return (req, res, next) => {
        // not authenticated at all
        if (!req.session || !req.session.user)
            return next(httpError(401));

        // authenticated + roles specified, but haven't permissions
        if (roles && !roles.concat(roles).includes(req.session.user.role)) {
            return next(httpError(403));
        }

        // only authenticated needed, no roles specified
        // OR
        // authenticated + roles matched
        next();
    }
}



module.exports = {
    authenticate,
    logout,
    authorizeMiddlewareFactory
}