import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createEpicMiddleware} from 'redux-observable';
import rootReduer from '../reducers';
import rootEpic from '../epics';

const epicMiddleware = createEpicMiddleware();

export const epicRun = () => {
	epicMiddleware.run(rootEpic);
};

const store = createStore(
	rootReduer,
	composeWithDevTools(
		applyMiddleware(epicMiddleware)
	)
);

export default store;