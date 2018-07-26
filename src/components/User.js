import React from 'react';

export const User = (props) => (
	<div className="user">
		<figure>
			<img src={props.avatar_url} alt="아바타" />
		</figure>
		<p>{props.name} ({props.login})</p>
	</div>
)
