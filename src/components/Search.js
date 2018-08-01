import React from 'react';

export const Search = ({defaultValue, onChange}) => (
	<div className="Search">
		<input
			type="text"
			placeholder="맥주의 종류를 검색하세요"
			defaultValue={defaultValue}
			onChange={(e) => onChange(e.target.value)}
		/>
	</div>
);

export default Search;