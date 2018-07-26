import {switchMap, delay} from 'rxjs/operators'
import {of} from 'rxjs';
import {combineEpics, ofType} from 'redux-observable';
import {clear, LOAD_STORIES} from "../actions";

export const loadStoriesEpic = action$ =>
	action$.pipe(
		ofType(LOAD_STORIES),
		switchMap(() => of(clear()).pipe(
			delay(3000)
		)),
	);