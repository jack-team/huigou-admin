import { applyMiddleware, createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import thunk from 'redux-thunk';
import session from 'redux-persist/lib/storage/session';
const createStoreAsync = applyMiddleware(thunk)(createStore);

import reducers from './reducer';

const opts = {
    key: 'hg',
    storage: session
};

const store = createStoreAsync(
    persistReducer(opts, combineReducers(reducers))
);

// persistStore(store);

export default store;