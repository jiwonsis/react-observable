import {combineReducers} from 'redux';
import storiesReducer from "./stories";
import usersReducer from "./users";

const rootReducer = combineReducers({
	stories: storiesReducer,
	user: usersReducer,
});

export default rootReducer;