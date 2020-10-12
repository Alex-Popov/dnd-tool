import React from 'react';
import ReactDOM from 'react-dom';

import Auth from './auth';
import App from './App';
import LoginForm from './pages/LoginForm';
import 'materialize-css/dist/css/materialize.min.css';


ReactDOM.render(
    <React.StrictMode>
        <Auth.Provider>
            <Auth.Context.Consumer>
                {(context) => (
                    <>
                        <div className="header">
                            <div>Logged: {context.isAuthenticated.toString()}</div>
                            <div>User Id: {context.userId}</div>
                            <div>Session: {context.sessionId}</div>
                        </div>
                        <hr/><br/>
                        {context.isAuthenticated ? <App /> : <LoginForm />}
                    </>
                )}
            </Auth.Context.Consumer>
        </Auth.Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
