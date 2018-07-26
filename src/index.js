import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import reducer from './reducers';

import {createEpicMiddleware} from 'redux-observable';
import {rootEpic} from "./epics";


const epicMiddleware = createEpicMiddleware();
const store = createStore(
    reducer,
	composeWithDevTools(
	    applyMiddleware(epicMiddleware)
    )
);
epicMiddleware.run(rootEpic);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

