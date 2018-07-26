import {switchMap, delay} from 'rxjs/operators'
import {Observable, of} from 'rxjs';
import {combineEpics, ofType} from 'redux-observable';
import {clear, LOAD_STORIES} from "../actions";

const loadStoriesEpic = action$ =>
	action$.pipe(
		ofType(LOAD_STORIES),
		switchMap(() => of(clear()).pipe(
			delay(3000)
		)),
	);


export const rootEpic = combineEpics(loadStoriesEpic);
