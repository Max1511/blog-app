import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import rootReducer from './reducers';
import App from './components/App';
import './index.scss';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <>
        <Provider store={store}>
            <App/>
        </Provider>
    </>
);