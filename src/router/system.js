import React , { Fragment } from 'react';

import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import LazyLoad from '../components/LazyLoad';
const Info = LazyLoad(() => import('../views/system/info.js'));
const Staff = LazyLoad(()=>import('../views/system/staff.js'));

export default props => {
    const { path } = props.match;
    return (
        <Fragment>
            <Route
                path={`${path}/info`}
                component={Info}
                desc="修改当前用户昵称和头像页面"
                exact
            />
            <Route
                path={`${path}/staff`}
                component={Staff}
                desc="员工管理"
            />
        </Fragment>
    );
}