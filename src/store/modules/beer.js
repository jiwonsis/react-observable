import {ajax} from 'rxjs/ajax';
import {debounceTime, switchMap, map} from 'rxjs/operators';
import {ofType, combineEpics} from "redux-observable";

// ACTIONS PARTS
const SEARCHED_BEERS = 'beer/SEARCHED_BEERS';
const RECEIVED_BEERS = 'beer/RECEIVED_BEERS';

const searchBeersAction = (query = '') => ({
	type: SEARCHED_BEERS,
	payload: query,
});
const receiveBeersAction = (beers = []) => ({
	type: RECEIVED_BEERS,
	payload: beers,
});

const action = {
	searchBeersAction,
	receiveBeersAction,
};

// REDUCER PARTS
const initialState = {
	beers: [],
	loading: false,
};

const beerReducer = (state = initialState, action) => {
	switch (action.type) {
		case SEARCHED_BEERS: return {
			...state,
			loading: true,
		};
		case RECEIVED_BEERS: return {
			beers: action.payload,
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
const receiveData = term => ajax.getJSON(search(term));

const searchBeerEpic = actions$ =>
	actions$.pipe(
		ofType(SEARCHED_BEERS),
		debounceTime(500),
		switchMap(({payload}) => receiveData(payload).pipe(
			map(data => receiveBeersAction(data))
		)),
	);

const epic = combineEpics(
	searchBeerEpic,
);

// COMBINE PARTS
export default {action, reducer, epic};

