import React from 'react';

export const Search = ({defaultValue, onChange, messages}) => (
	<div className="Search">
		<input
			type="text"
			placeholder="맥주의 종류를 검색하세요"
			defaultValue={defaultValue}
			onChange={(e) => onChange(e.target.value)}
		/>
		{
			console.log(messages)
		}
		{
			messages &&
			messages.length > 0 && (
				<ul>
					{messages.map(message =>
						<li key={message.text} className={`Message Message--${message.type}`}>
							{message.text}
						</li>
					)}
				</ul>
			)
		}
	</div>
);

export default Search;