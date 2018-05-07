import React from 'react';

import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import HomeRouter from './home';
import Login from './../views/login';
import Auth from './../components/Auth';
import Test from './../views/test';

export default (
    <Switch>
        <Route
            path="/"
            render={() => (
                <Redirect to="/home"/>
            )}
            exact
        />
        <Route
            path="/home"
            component={Auth(HomeRouter)}
        />
        <Route
            path="/login"
            component={Auth(Login, false)}
            exact
        />
        <Route
            path="/test"
            component={Test}
            exact
        />
    </Switch>
);