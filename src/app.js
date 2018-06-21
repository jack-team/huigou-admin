import React from 'react';
import { render } from 'react-dom';
import { HashRouter , BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { message } from 'antd';

import './common/common';

import './common/base.scss';

import store from './state/store';

window.message = message;

import routes from './router/root';

import './common/reset.scss';

import './common/http';

import Container from './components/Container';
const App = () => (
    <Provider store={store}>
        <Container>
            <BrowserRouter basename="/admin/site">
                {routes}
            </BrowserRouter>
        </Container>
    </Provider>
);

render(<App />, document.getElementById('root'));

