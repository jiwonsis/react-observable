import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import reducer from './reducers';
import userReducer from './reducers/users';

import {createEpicMiddleware, combineEpics} from 'redux-observable';
import {loadStoriesEpic} from "./epics";
import {fetchUserEpic} from './epics/userEpic';

const rootEpic = combineEpics(loadStoriesEpic, fetchUserEpic);

const rootReducer = combineReducers({
	story: reducer,
	user: userReducer,
});

const epicMiddleware = createEpicMiddleware();
const store = createStore(
	rootReducer,
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

