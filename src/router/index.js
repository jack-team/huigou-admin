import React from 'react';

import {
    Route,
    Switch,
    Router,
    Redirect
} from 'mirrorx';

import LazyLoad from './../components/LazyLoad';


const Home = LazyLoad(()=>import('./../views/home.js'));


export default (
    <Switch>
        <Route
            path="/"
            component={Home}
            exact
        />
    </Switch>
)