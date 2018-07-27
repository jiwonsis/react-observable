import React from 'react';
import {connect} from 'react-redux';
import {User} from './User';
import users from "../store/modules/users";

export const Users = (props) => (
	<div>
		<ul>
			{console.log(props)}
			{props.user.users.map(login =>
				<li key={login}>
					{login}
					<button type="button" onClick={() => props.loadUser(login)}>유저 데이터 불러오기</button>
				</li>
			)}
			{
				props.user.loading &&
				<p>로딩중...</p>
			}
			{
				props.user.current &&
				<User {...props.user.current} />
			}
		</ul>
	</div>
);

const mapState = (state) => (
	state
);

const mapDispatch = (dispatch) => ({
	loadUser: (login) => dispatch(users.action.fetchUserAction(login))
});

export default connect(mapState, mapDispatch)(Users);