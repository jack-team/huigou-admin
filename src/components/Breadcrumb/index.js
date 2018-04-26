import React, { PureComponent } from 'react';
import {
    Link
} from 'react-router-dom';

import PropTypes from 'prop-types';

import { Breadcrumb , Icon } from 'antd';

import styles from './styles.scss';

class BaseBreadcrumb extends PureComponent {

    static propTypes = {
        routes: PropTypes.array
    };

    static defaultProps = {
        routes: []
    };

    itemRender = (route, params, routes, paths) => {
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? <span className={styles.current}>{route.breadcrumbName}</span> :
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
    };

    render() {
        const { routes } = this.props;
        const baseRoute = [{
            path: '',
            breadcrumbName: '平台首页'
        }];
        return (
            <div className={styles.base_breadcrumb}>
                <Icon
                    type="home"
                    className={styles.home_icon}
                />
                <Breadcrumb
                    className={styles.main_breadcrumb}
                    routes={baseRoute.concat(routes)}
                    itemRender={this.itemRender}
                />
            </div>
        );
    }
}

export default BaseBreadcrumb;