import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Auth, { AuthContext, logout } from './components/Auth';
import LoginForm from './pages/LoginForm';
import API from './core/api';

const handleLogout = () => {
    API.auth.logout()
        .then(() => logout())
        .catch(() => {});
}

ReactDOM.render(
    <React.StrictMode>
        <Auth>
            <AuthContext.Consumer>
                {(context) => (
                    <>
                        <div className="header">
                            <div>Logged: {context.isAuthenticated.toString()}</div>
                            <div>User Id: {context.userId}</div>
                            <div>Session: {context.sessionId}</div>
                            {context.isAuthenticated && <button onClick={handleLogout}>Logout</button>}
                        </div>
                        <hr/><br/>
                        {context.isAuthenticated ? <App /> : <LoginForm />}
                    </>
                )}
            </AuthContext.Consumer>
        </Auth>
    </React.StrictMode>,
    document.getElementById('root')
);
