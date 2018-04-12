import React, {PureComponent, PropTypes} from 'react';


const Loading = props => (
    <div>11111</div>
);

export default Promise => (
    class LoadComponent extends PureComponent {

        Promise = Promise;

        state = {
            Component: Loading
        };

        componentWillMount() {
            this.loadComp();
        }

        loadComp() {
            this.Promise().then(comp => {
                return comp.default ? comp.default : comp;
            }).then(comp => (
                this.setState({
                    Component: comp
                })
            ));
        }

        render() {
            const {Component} = this.state;
            return <Component/>;
        }
    }
);









