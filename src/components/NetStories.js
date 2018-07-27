import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import netStories from '../store/modules/netStories';

const NetStories = (props) => (
	props.netStories.loading ?
		<p>로딩 중...</p> :
		<Fragment>
			<button type="button" onClick={props.loadStories}>
				탑 5개의 스토리 불러오기
			</button>
			{
				<StoryList stories={props.netStories.stories}/>
			}
		</Fragment>
);

const StoryList = (props) => (
	<ul>
		{props.stories.map(story =>
			<li key={story.id}>
				<a href={story.url}>{story.title}</a>
			</li>
		)}
	</ul>
)

const mapState = (state) => state;
const mapDispatch = (dispatch) => ({
	loadStories: () => dispatch(netStories.action.fetchStoriesAction())
});

export default connect(mapState, mapDispatch)(NetStories);
