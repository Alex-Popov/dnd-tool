import React from 'react';
import LoginForm from '../../components/LoginForm';
import Container from '@material-ui/core/Container';
import css from './Login.module.css';

function Login() {
    return (
        <div className={`d-flex align-items-center justify-content-center ${css.fullScreen}`}>
            <Container maxWidth="xs">
                <LoginForm />
            </Container>
        </div>
    );
}


export default Login;