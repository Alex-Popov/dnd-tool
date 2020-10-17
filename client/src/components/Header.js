import React from 'react';
import Auth from '../auth';
import AppBar from '@material-ui/core/AppBar';

function Header() {
    return (
        <AppBar>
            <Auth.Context.Consumer>
                {({isAuthenticated, userId, sessionId}) => (
                    <div className="header">
                        <div>Logged: {isAuthenticated.toString()}</div>
                        <div>User Id: {userId}</div>
                        <div>Session: {sessionId}</div>
                    </div>
                )}
            </Auth.Context.Consumer>
        </AppBar>
    );
}


export default Header;