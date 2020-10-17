import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Auth from '../auth';

import Login from '../pages/Login/Login';
import Tester from '../pages/Tester';
import Header from './Header';
import Post from '../pages/Post';
import Editor from '../pages/Editor';
import Wall from '../pages/Wall';
import Sections from '../pages/Sections';


import theme from '../theme';


export default function App() {
    return (
        <React.StrictMode>
            <ThemeProvider theme={theme.config}>
                <CssBaseline />
                <Auth.Provider>
                    <Auth.Context.Consumer>
                        {({isAuthenticated}) => !isAuthenticated
                            ? <Login />
                            : <Router>
                                <Header />

                                <Switch>
                                    <Route path="/new" exact>
                                        <Editor />
                                    </Route>
                                    <Route path="/edit/:id" exact>
                                        <Editor />
                                    </Route>
                                    <Route path="/post/:id" exact>
                                        <Post />
                                    </Route>
                                    <Route path="/sections" exact>
                                        <Sections />
                                    </Route>
                                    <Route path="/" exact>
                                        <Tester />
                                    </Route>
                                    <Redirect to="/" />
                                </Switch>
                            </Router>
                        }
                    </Auth.Context.Consumer>
                </Auth.Provider>
            </ThemeProvider>
        </React.StrictMode>
    );
}