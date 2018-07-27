import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createEpicMiddleware} from 'redux-observable';
import modules from './modules';

const epicMiddleware = createEpicMiddleware();

export const epicRun = () => {
	epicMiddleware.run(modules.rootEpic);
};

const store = createStore(
	modules.rootReducer,
	composeWithDevTools(
		applyMiddleware(epicMiddleware)
	)
);

export default store;