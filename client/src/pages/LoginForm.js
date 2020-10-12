import React from 'react';
import API from '../core/api';
import Auth from "../auth";


export default class LoginForm extends React.Component {
    state = {
        username: '',
        password: ''
    };
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    submit = () => {
        API.auth.login(this.state.username, this.state.password)
            .then(data => {
                Auth.login(data.sessionId, data.userId, data.userRole);
            })
            .catch(e => {})
    }

    render() {
        return (
            <div className="login-form">
                <input name="username" value={this.state.username} onChange={this.handleChange} />
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                <button type="button" onClick={this.submit}>Login</button>
            </div>
        );
    }
}