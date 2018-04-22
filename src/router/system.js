import React , { Fragment } from 'react';

import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import LazyLoad from '../components/LazyLoad';
const Info = LazyLoad(() => import('../views/system/info.js'));

export default props => {
    const { path } = props.match;
    return (
        <Fragment>
            <Route
                path={`${path}/info`}
                component={Info}
                exact
            />
        </Fragment>
    );
}