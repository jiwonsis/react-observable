import {combineEpics} from 'redux-observable';
import {combineReducers} from 'redux';
import users from './users';
import stories from './stories';
import netStories from './netStories';
import beer from './beer';

const rootEpic = combineEpics(
	users.epic,
	stories.epic,
	netStories.epic,
	beer.epic,
);
const rootReducer = combineReducers(
	Object.assign(
		users.reducer,
		stories.reducer,
		netStories.reducer,
		beer.reducer,
	)
);

const rootAction = {
	users: users.action,
	stories: stories.action,
	netStories: netStories.action,
	beer: beer.action,
};

const module = {
	rootEpic, rootReducer, rootAction,
};

export default module;