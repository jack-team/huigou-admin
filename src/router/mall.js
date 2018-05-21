import React from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import LazyLoad from './../components/LazyLoad';

const Category = LazyLoad(()=>import('./../views/mall/category'));

const Manage =  LazyLoad(()=>import('./../views/mall/manage'));

const AddGoods = LazyLoad(()=>import('./../views/mall/addGood'));

export default props => {
    const { path } = props.match;
    return (
        <Switch>
            <Route
                path={`${path}/category`}
                component={Category}
                exact
            />
            <Route
                path={`${path}/manage`}
                component={Manage}
                exact
            />
            <Route
                path={`${path}/manage/add`}
                component={AddGoods}
                exact
            />
            <Route
                path={`${path}/manage/:id`}
                component={AddGoods}
                exact
            />
        </Switch>
    );
}