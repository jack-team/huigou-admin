import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { message } from 'antd';


import store from './state/store';

window.message = message;

import routes from './router';

import './common/reset.scss';

import './common/http';

const App = () => (
    <Provider store={store}>
        <HashRouter>
            {routes}
        </HashRouter>
    </Provider>
);

render(<App />, document.getElementById('root'));

