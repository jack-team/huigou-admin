import React from 'react';
import mirror, {render, Router} from 'mirrorx';

mirror.defaults({
    historyMode: 'hash'
});

import routes from './router';

const App = () => (
    <Router>
        {routes}
    </Router>
);


render(<App/>, document.getElementById(`root`));
