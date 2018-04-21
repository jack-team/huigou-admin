import React from 'react';

import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import LazyLoad from '../components/LazyLoad';

const Home = LazyLoad(() => import('./../views/home.js'));

const HomeIndex = LazyLoad(() => import('./../views/homeIndex.js'));

//商品
const goodsList = LazyLoad(() => import('./../views/goods/list.js'));

const Routes = props => {
    const { path } = props.match;
    return (
        <Switch>
            <Route
                name="首页"
                path={path}
                render={() => (
                    <Redirect
                        to={`${path}/index`}
                    />
                )}
                exact
            />
            <Route
                name="系统管理"
                path={`${path}/index`}
                component={HomeIndex}
                exact
            />
            <Route
                name="系统管理"
                path={`${path}/system`}
                component={HomeIndex}
                exact
            />
            <Route
                name="商品管理"
                path={`${path}/mall`}
                component={goodsList}
                exact
            />
        </Switch>
    );
};

export default props => (
    <Route render={() => (
        <Home {...props}>
            <Routes {...props}/>
        </Home>
    )}/>
)