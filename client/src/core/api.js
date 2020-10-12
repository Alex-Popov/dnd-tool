import { Get, Post } from './query.js';

//
// API methods
//
export default {
    auth: {
        login: (username, password) => Post('/api/auth/login', {username, password}),
        logout: () => Post('/api/auth/logout'),
        changePassword: (oldPassword, newPassword) => Post('/api/auth/changePassword', {oldPassword, newPassword}),
        autoLogin: () => Get('/api/auth/autoLogin')
    },
    user: {
        getAll: () => Get('/api/user/getAll'),
        getById: id => Get('/api/user/getById', {id}),
        getCurrent: () => Get('/api/user/getCurrent'),
    }
};
