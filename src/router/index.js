import React from 'react';

import {
    Route,
    Switch
} from 'react-router-dom';

import LazyLoad from './../components/LazyLoad';

import Auth from './../components/Auth';

const Login = LazyLoad(() => import('./../views/login.js'));

const Home = LazyLoad(() => import('./../views/home.js'));

export default (
    <Switch>
        <Route
            path="/"
            component={Auth(Home)}
            exact
        />
        <Route
            path="/login"
            component={Auth(Login, false)}
            exact
        />
    </Switch>
);