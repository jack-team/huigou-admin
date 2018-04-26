import React, { PureComponent, Fragment } from 'react';
import { Spin, Icon } from 'antd';
import styles from './styles.scss';

const antIcon = (
    <Icon
        type="loading"
        className={styles.loading_icon}
        spin
    />
);

class Container extends PureComponent {
    render() {
        return (
            <Fragment>
                <LoadingState/>
                {this.props.children}
            </Fragment>
        );
    }
}

class LoadingState extends PureComponent {
    constructor() {
        super();
        this.state = {
            show: false
        };
    }

    componentWillMount() {

        window.loading = () => {
            this.setState({
                show: true
            });
        };

        window.loadingClose = () => {
            setTimeout(()=>{
                this.setState({
                    show: false
                });
            },500)
        };
    }

    render() {
        const { show } = this.state;
        return (
            <div className={className(
                styles.window_loading,
                !show && styles.hide
            )}>
                <div className={styles.loading_center}>
                    <Spin
                        indicator={antIcon}
                    />
                </div>
            </div>
        );
    }

}

export default Container;