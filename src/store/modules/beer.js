import {ajax} from 'rxjs/ajax';
import {throwError, of} from 'rxjs'
import {debounceTime, switchMap, map, catchError} from 'rxjs/operators';
import {ofType, combineEpics} from "redux-observable";

// ACTIONS PARTS
const SEARCHED_BEERS = 'beer/SEARCHED_BEERS';
const RECEIVED_BEERS = 'beer/RECEIVED_BEERS';
const SEARCHD_BEERS_ERROR = 'beer/SEARCHD_BEERS_ERROR';

const searchBeersAction = (query = '') => ({
	type: SEARCHED_BEERS,
	payload: query,
});
const receiveBeersAction = (beers = []) => ({
	type: RECEIVED_BEERS,
	payload: beers,
});
const searchBeersErrorAction = (error) => ({
	type: SEARCHD_BEERS_ERROR,
	payload: error.message,
});

const action = {
	searchBeersAction,
	receiveBeersAction,
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
			loading: true,
			messages: [],
		};
		case RECEIVED_BEERS: return {
			...state,
			beers: action.payload,
			loading: false,
		};
		case SEARCHD_BEERS_ERROR: return {
			...state,
			loading: false,
			messages: [{type: 'error', text: action.payload}],
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
		debounceTime(500),
		switchMap(({payload}) => receiveData(payload).pipe(
			map(data => receiveBeersAction(data)),
			catchError(err =>
				of(searchBeersErrorAction(err))
			)
		)),
	);

const epic = combineEpics(
	searchBeerEpic,
);

// COMBINE PARTS
export default {action, reducer, epic};

