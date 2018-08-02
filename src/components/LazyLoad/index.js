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

const Loading = () => (
    <div className={styles.load_page}>
        <Spin indicator={antIcon}/>
    </div>
);

//高阶组件
export default Promise => (
    class LoadComponent extends PureComponent {

        Promise = Promise;

        life = true;

        state = {
            Component: Loading
        };

        componentWillMount() {
            this.load();
        }

        componentWillUnmount() {
            this.life = false;
        }

        async load() {
            const result = await this.Promise();
            const Component = result.default ? result.default : result;
            if (this.life) {
                this.setState({
                    Component
                });
            }
        }

        render() {
            const {
                Component
            } = this.state;
            return (
                <Component
                    {...this.props}
                />
            );
        }
    }
)









