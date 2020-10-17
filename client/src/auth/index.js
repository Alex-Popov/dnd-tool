import React from 'react';
import { createStore } from "redux";
import API from "../core/api";
const { ROLE_ADMIN, ROLE_USER } = require('./roles');


//
// CONSTANTS
//
export {
    ROLE_ADMIN,
    ROLE_USER
};
export const UNAUTHENTICATED_STATE = {
    sessionId: null,
    userId: null,
    userRole: null,
    isAuthenticated: false
}

//
// Store
//
const authReducer = (state = {...UNAUTHENTICATED_STATE}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...UNAUTHENTICATED_STATE,
                sessionId: action.sessionId,
                userId: action.userId,
                userRole: action.userRole,
                isAuthenticated: true
            };

        case 'LOGOUT':
            return {...UNAUTHENTICATED_STATE};

        default:
            return state;
    }
}
export const AuthStore = createStore(authReducer);

//
// Api
//
export const login = ({sessionId, userId, userRole}) => {
    if (!sessionId || !userId) logout();

    AuthStore.dispatch({
        type: 'LOGIN',
        sessionId,
        userId,
        userRole
    });
}
export const logout = () => {
    AuthStore.dispatch({ type: 'LOGOUT' });
}

//
// Context
//
export const AuthContext = React.createContext({});

//
// Components
//
export class AuthProvider extends React.Component {
    state = {...UNAUTHENTICATED_STATE};
    unsubscribe = () => {};

    async componentDidMount() {
        // subscribe on Redux store
        this.unsubscribe = AuthStore.subscribe(() => {
            this.setState(AuthStore.getState());
        });

        // auto login
        //if (this.state.isAuthenticated)
        API.auth.autoLogin()
            .then(login)
            .catch(() => {})
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <AuthContext.Provider value={this.state}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}
export function IsAuthenticated(props) {
    return (
        <AuthContext.Consumer>
            {(context) => (
                context.isAuthenticated && props.children
            )}
        </AuthContext.Consumer>
    );
}
export function IsUserRole(props) {
    return (
        <IsAuthenticated>
            <AuthContext.Consumer>
                {(context) => (
                    context.userRole == props.role && props.children
                )}
            </AuthContext.Consumer>
        </IsAuthenticated>
    );
}
export function IsAdmin(props) {
    return <IsUserRole {...props} role={ROLE_ADMIN} />;
}

export default {
    Store: AuthStore,
    Context: AuthContext,
    Provider: AuthProvider,
    IsAuthenticated,
    IsUserRole,
    IsAdmin,
    login,
    logout
}