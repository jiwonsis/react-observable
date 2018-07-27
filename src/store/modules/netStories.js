
// ACTION PART
import {ajax} from 'rxjs/ajax';
import {forkJoin} from 'rxjs';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import {combineEpics, ofType,} from "redux-observable";

const FETCH_STORIES = 'FETCH_STORIES';
const FETCH_STORIES_FULFILLED = 'FETCH_STORIES_FULFILLED';

const fetchStoriesAction = (count = 5) => ({
	type: FETCH_STORIES,
	payload: count,
});

const fetchStoriesFulfilledAction = (stories) => ({
	type: FETCH_STORIES_FULFILLED,
	payload: stories,
});

const action = {
	fetchStoriesAction,
	fetchStoriesFulfilledAction,
};

//  REDUCER PART
const initialState = {
	stories: [],
	loading: false,
};

const netStoryReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_STORIES: return {
			stories: [],
			loading: true,
		};
		case FETCH_STORIES_FULFILLED: return {
			stories: action.payload,
			loading: false,
		};
		default : return state;
	}
};

const reducer = {
	netStories: netStoryReducer,
};

// EPIC PART
const topStories = `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`;
const url = id =>
	`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;

const fetchStoriesEpic = actions$ =>
	actions$.pipe(
		ofType(FETCH_STORIES),
		switchMap(() =>
			ajax.getJSON(topStories).pipe(
				// slice first 5 ids
				map(ids => ids.slice(0, 5)),
				// convert ids -> urls
				map(ids => ids.map(url)),
				// convert urls -> ajax
				map(urls => urls.map(url => ajax.getJSON(url))),
				// execute 5 ajax requests
				mergeMap(requests => forkJoin(requests)),
				// results -> store
				map(stories => fetchStoriesFulfilledAction(stories)),
			)
		)
	);

const epic = combineEpics(
	fetchStoriesEpic,
);

export default { action, reducer, epic };