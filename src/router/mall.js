import React from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import LazyLoad from './../components/LazyLoad';

const Category = LazyLoad(()=>import('./../views/mall/category'));

export default props => {
    const { path } = props.match;
    return (
        <Switch>
            <Route
                path={`${path}/category`}
                component={Category}
            />
        </Switch>
    );
}