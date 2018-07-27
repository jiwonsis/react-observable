import {switchMap, delay} from 'rxjs/operators'
import {of} from 'rxjs';
import {ofType} from 'redux-observable';
import rootActions from "../actions";

export const loadStoriesEpic = action$ =>
	action$.pipe(
		ofType(rootActions.stories.LOAD_STORIES),
		switchMap(() => of(rootActions.stories.clear()).pipe(
			delay(3000)
		)),
	);