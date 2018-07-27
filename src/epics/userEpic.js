import {ofType} from 'redux-observable';
import {switchMap, map} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';
import rootAction from "../actions";

export const fetchUserEpic = action$ =>
	action$.pipe(
		ofType(rootAction.users.FETCH_USER),
		switchMap(({payload}) =>
				ajax.getJSON(`https://api.github.com/users/${payload}`).pipe(
				map(user => rootAction.users.fetchUserFulfilledAction(user))
			)
		),
	);