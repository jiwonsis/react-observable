import { combineEpics } from 'redux-observable';
import {loadStoriesEpic} from "./storiesEpic";
import {fetchUserEpic} from "./userEpic";

const rootEpic = combineEpics(
	loadStoriesEpic,
	fetchUserEpic,
);

export default rootEpic;