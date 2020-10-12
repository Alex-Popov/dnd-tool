import React from 'react';
import API from './core/api';
import Auth from './auth';


const getUsers = () => {
    API.user.getAll()
        .then(data => console.log(data))
        .catch(error => {})
}
const getCurrentUser = () => {
    API.user.getCurrent()
        .then(data => console.log(data))
        .catch(error => {})
}
const handleLogout = () => {
    API.auth.logout()
        .then(() => Auth.logout())
        .catch(() => {});
}


export default function App() {
//    static contextType = AuthContext;
    return (
        <div className="app">
            <h1>[App Body]</h1>
            <Auth.IsAdmin>
                <a onClick={getUsers} className="waves-effect waves-light btn">Get Users</a>
            </Auth.IsAdmin>
            <a onClick={getCurrentUser} className="waves-effect waves-light btn">Get Current User</a>
            <hr/>
            <Auth.IsAuthenticated>
                <button onClick={handleLogout} className="btn red">Logout</button>
            </Auth.IsAuthenticated>
        </div>
    );
}