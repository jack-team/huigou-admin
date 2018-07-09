import React from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import LazyLoad from '../components/LazyLoad';

const BaseLayout = LazyLoad(() => import('../components/BaseLayout'));

//首页
const Home = LazyLoad(() => import('../views/home.js'));

//商城管理路由
import mallRoutes from './mall';

//系统管理路由模块
import systemRoutes from './system';

const Routes = props => {
    const {
        path
    } = props.match;
    return (
        <Switch>
            <Route
                desc="中转页面，重定向到home/index"
                path={path}
                render={() => (
                    <Redirect
                        to={`${path}/index`}
                    />
                )}
                exact
            />
            <Route
                desc="平台首页"
                path={`${path}/index`}
                component={Home}
                exact
            />
            <Route
                desc="商品管理"
                path={`${path}/mall`}
                component={mallRoutes}
            />
            <Route
                desc="系统管理"
                path={`${path}/system`}
                component={systemRoutes}
            />
        </Switch>
    );
};

export default props => (
    <Route render={() => (
        <BaseLayout {...props}>
            <Routes {...props}/>
        </BaseLayout>
    )}/>
)