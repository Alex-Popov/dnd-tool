import React from 'react';
import API from './core/api';
import { AuthContext } from "./components/Auth";

const getUsers = () => {
    API.user.getAll()
        .then(data => console.log(data))
        .catch(error => {})
}


export default class App extends React.Component {
    static contextType = AuthContext;

    render() {
        return (
            <div className="app">
                <h1>[App Body]</h1>
                <button onClick={getUsers}>Get Users</button>
            </div>
        );
    }
}