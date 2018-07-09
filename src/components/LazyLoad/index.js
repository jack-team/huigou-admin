import React, { PureComponent } from 'react';

import styles from './styles.scss';

import {
    Spin,
    Icon
} from 'antd';

const antIcon = (
    <Icon
        type="loading"
        className={styles.loading_icon}
        spin
    />
);

const Loading = props => (
    <div className={styles.load_page}>
        <Spin
            indicator={antIcon}
        />
    </div>
);

//高阶组件
export default Promise => (
    class LoadComponent extends PureComponent {

        Promise = Promise;

        life = true;

        state = {
            Component: null
        };

        componentWillMount() {
            this.load();
        }

        componentWillUnmount() {
            this.life = false;
        }

        load() {
            this.Promise()
                .then(comp => {
                    return comp.default ? comp.default : comp;
                })
                .then(comp => {
                    if (this.life) {
                        this.setState({
                            Component: comp
                        });
                    }
                });
        }

        render() {
            const { Component } = this.state;
            return <Component {...this.props}/>;
        }
    }
)









