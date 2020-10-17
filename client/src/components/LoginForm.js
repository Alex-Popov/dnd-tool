import React from 'react';
import API from '../core/api';
import Auth from '../auth';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



export default class LoginForm extends React.Component {
    state = {
        username: '',
        password: ''
    };
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    handleSubmit = (e) => {
        e.preventDefault();

        API.auth.login(this.state.username, this.state.password)
            .then(Auth.login)
            .catch(e => {})
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <TextField
                    label="Username"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    required

                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
                <TextField
                    type="password"
                    label="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required

                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={!this.state.username || !this.state.password}
                >
                    Login
                </Button>
            </form>
        );
    }
}

