import {ajax} from 'rxjs/ajax';
import {throwError, of, merge} from 'rxjs'
import {debounceTime, switchMap, map, catchError, filter, takeUntil, delay} from 'rxjs/operators';
import {ofType, combineEpics} from "redux-observable";

// ACTIONS PARTS
const SEARCHED_BEERS = 'beer/SEARCHED_BEERS';
const RECEIVED_BEERS = 'beer/RECEIVED_BEERS';
const SEARCHED_BEERS_ERROR = 'beer/SEARCHED_BEERS_ERROR';
const SEARCHED_BEERS_LOADING = 'beer/SEARCHED_BEERS_LOADING';
const CANCEL_SEARCH = 'beer/CANCEL_SEARCH';
const NAVIGATE = 'beer/NAVIGATE';

const searchBeersAction = (query = '') => ({
	type: SEARCHED_BEERS,
	payload: query,
});
const receiveBeersAction = (beers = []) => ({
	type: RECEIVED_BEERS,
	payload: beers,
});
const searchBeersErrorAction = (error) => ({
	type: SEARCHED_BEERS_ERROR,
	payload: error.message,
});
const searchBeersLoadingAction = (loading) => ({
	type: SEARCHED_BEERS_LOADING,
	payload: loading,
});
const cancelSearchAction = () => ({
	type: CANCEL_SEARCH
});

const action = {
	searchBeersAction,
	receiveBeersAction,
	cancelSearchAction,
};

// REDUCER PARTS
const initialState = {
	beers: [],
	loading: false,
	messages: [],
};

const beerReducer = (state = initialState, action) => {
	switch (action.type) {
		case SEARCHED_BEERS: return {
			...state,
			messages: [],
		};
		case RECEIVED_BEERS: return {
			...state,
			beers: action.payload,
			loading: false,
		};
		case SEARCHED_BEERS_ERROR: return {
			...state,
			loading: false,
			messages: [{type: 'error', text: action.payload}],
		};
		case SEARCHED_BEERS_LOADING: return {
			...state,
			loading: action.payload,
		};
		case CANCEL_SEARCH: return {
			...state,
			loading: false,
		};
		default: return state;
	}
};

const reducer = {
	beer: beerReducer,
};

// EPIC PARTS
const beersURL = `https://api.punkapi.com/v2/beers`;
const search = term => `${beersURL}?beer_name=${encodeURIComponent(term)}`;
const receiveData = term =>
	term === 'skull'
		? throwError(new Error('Ajax Failed'))
		: ajax.getJSON(search(term));

const searchBeerEpic = actions$ =>
	actions$.pipe(
		ofType(SEARCHED_BEERS),
		filter(action => action.payload !== ''),
		switchMap(({payload}) => {
			const loading = of(searchBeersLoadingAction(true));
			const request = receiveData(payload).pipe(
				delay(5000),
				takeUntil(actions$.pipe(ofType(CANCEL_SEARCH))),
				map(receiveBeersAction),
				catchError(err =>
					of(searchBeersErrorAction(err))
				)
			);
			return merge(loading, request);
		}),
	);

const epic = combineEpics(
	searchBeerEpic,
);

// COMBINE PARTS
export default {action, reducer, epic};

