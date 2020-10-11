import React from 'react';
import API from '../core/api';
import { login } from "../components/Auth";


export default class LoginForm extends React.Component {
    state = {
        username: '',
        password: '',
        oldPassword: '',
        newPassword: ''
    };
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    submit = () => {
        API.auth.login(this.state.username, this.state.password)
            .then(data => {
                login(data.sessionId, data.userId);
            })
            .catch(e => {})
    }
    /*changePassword = () => {
        API.auth.changePassword(this.state.oldPassword, this.state.newPassword)
            .then(data => console.log(data))
            .catch(e => {})
    }
                    <br/><br/>
                <div>
                    <input name="oldPassword" value={this.state.oldPassword} onChange={this.handleChange} />
                    <input name="newPassword" value={this.state.newPassword} onChange={this.handleChange} />
                    <button type="button" onClick={this.changePassword}>Change Password</button>
                </div>

    */

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