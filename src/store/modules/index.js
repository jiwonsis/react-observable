import {combineEpics} from 'redux-observable';
import {combineReducers} from 'redux';
import users from './users';
import stories from './stories';
import netStories from './netStories';

const rootEpic = combineEpics(
	users.epic,
	stories.epic,
	netStories.epic,
);
const rootReducer = combineReducers(
	Object.assign(
		users.reducer,
		stories.reducer,
		netStories.reducer,
	)
);

const rootAction = {
	users: users.action,
	stories: stories.action,
	netStories: netStories.action,
};

export default {
	rootEpic, rootReducer, rootAction,
};