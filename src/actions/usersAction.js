export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED';

export const fetchUserAction = (login) => ({
	type: FETCH_USER,
	payload: login,
});

export const fetchUserFulfilledAction = (user) => ({
	type: FETCH_USER_FULFILLED,
	payload: user,
});