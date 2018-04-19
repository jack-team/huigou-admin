import React, { PureComponent } from 'react';

const Loading = props => (
    <div>loading...</div>
);

//高阶组件
export default Promise => (
    class LoadComponent extends PureComponent {

        Promise = Promise;

        state = {
            Component: Loading
        };

        componentWillMount() {
            this.load();
        }

        load() {
            this.Promise()
                .then(comp => {
                    return comp.default ? comp.default : comp;
                })
                .then(comp => (
                    this.setState({
                        Component: comp
                    })
                ));
        }

        render() {
            const { Component } = this.state;
            return <Component {...this.props}/>;
        }
    }
)









