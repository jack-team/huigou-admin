import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export default (keys = [], actions = {}) => {
    if (!Array.isArray(keys)) {
        actions = keys;
        keys = [];
    }
    const nextConnect = connect(state => {
        const reducers = {};
        keys.forEach(key => {
            reducers[key] = state[key];
        });
        return reducers;
    }, dispatch => {
        const act = {};
        Object.keys(actions).forEach(name => {
            act[name] = bindActionCreators(actions[name], dispatch);
        });
        return act;
    });

    return comp => nextConnect(comp);
}