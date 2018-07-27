import {combineEpics} from 'redux-observable';
import {combineReducers} from 'redux';
import users from './users';
import stories from './stories';

const rootEpic = combineEpics(
	users.epic,
	stories.epic,
);
const rootReducer = combineReducers(
	Object.assign(
		users.reducer,
		stories.reducer,
	)
);

const rootAction = {
	users: users.action,
	stories: stories.action,
};



export default {
	rootEpic, rootReducer, rootAction,
};