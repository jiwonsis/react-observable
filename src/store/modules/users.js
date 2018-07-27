import {ofType} from 'redux-observable';
import {switchMap, map} from 'rxjs/operators';
import {combineEpics} from 'redux-observable';
import {ajax} from 'rxjs/ajax';

// ACTION PART
const FETCH_USER = 'FETCH_USER';
const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED';

const fetchUserAction = (login) => ({
	type: FETCH_USER,
	payload: login,
});

const fetchUserFulfilledAction = (user) => ({
	type: FETCH_USER_FULFILLED,
	payload: user,
});

const action = {
	fetchUserAction,
	fetchUserFulfilledAction,
};

// REDUCER PART
const initialState = {
	users: [
		'shakyshane',
		'sindresorhus',
		'substack'
	],
	current: null,
	loading: false,
};

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USER:
			return {
				...state,
				current: null,
				loading: true,
			};
		case FETCH_USER_FULFILLED:
			return {
				...state,
				current: action.payload,
				loading: false,
			};
		default: return state;
	}
};

const reducer = {
	user: usersReducer,
};

// EPIC PART
const fetchUserEpic = action$ =>
	action$.pipe(
		ofType(FETCH_USER),
		switchMap(({payload}) =>
			ajax.getJSON(`https://api.github.com/users/${payload}`).pipe(
				map(user => fetchUserFulfilledAction(user))
			)
		),
	);

const epic = combineEpics(
	fetchUserEpic,
);

export default { action, reducer, epic };


