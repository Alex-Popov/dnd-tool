import React from 'react';
import { createStore } from "redux";
import API from "../core/api";

export const UNAUTHENTICATED_STATE = {
    sessionId: null,
    userId: null,
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
                isAuthenticated: true
            };

        case 'LOGOUT':
            return {...UNAUTHENTICATED_STATE};

        default:
            return state;
    }
}
export const authStore = createStore(authReducer);

//
// Api
//
export const login = (sessionId, userId) => {
    authStore.dispatch({
        type: 'LOGIN',
        sessionId: sessionId,
        userId: userId
    });
}
export const logout = () => {
    authStore.dispatch({
        type: 'LOGOUT',
    });
}

//
// Context
//
export const AuthContext = React.createContext({});

//
// Provider
//
export default class Auth extends React.Component {
    state = {...UNAUTHENTICATED_STATE};
    unsubscribe = () => {};

    async componentDidMount() {
        console.log('- Auth componentDidMount');
        this.unsubscribe = authStore.subscribe(() => {
            this.setState(authStore.getState());
        });

        // auto login
        //if (this.state.isAuthenticated)
        API.auth.autoLogin()
            .then(({sessionId, userId}) => login(sessionId, userId))
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