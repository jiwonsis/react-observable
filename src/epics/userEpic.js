import {ofType} from 'redux-observable';
import {switchMap, map} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';
import {FETCH_USER, fetchUserFulfilledAction} from "../actions/usersAction";

export const fetchUserEpic = action$ =>
	action$.pipe(
		ofType(FETCH_USER),
		switchMap(({payload}) =>
				ajax.getJSON(`https://api.github.com/users/${payload}`).pipe(
				map(user => fetchUserFulfilledAction(user))
			)
		),
	);