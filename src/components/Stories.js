import * as React from 'react';
import {connect} from 'react-redux';
import stories from "../store/modules/stories";

export const Stories = (props) => (
    <React.Fragment>
        <button type="button" onClick={props.loadStories}>상위 3개 스토리 불러오기</button>
        <button type="button" onClick={props.clear}>초기화</button>
        <StoryList {...props} />
    </React.Fragment>
);

const StoryList = (props) => (
	props.stories.items.length === 0 ?
		null :
		<React.Fragment>
			{props.stories.items.map(item => <Story {...item} key={item.id} />)}
		</React.Fragment>
);

const Story = (props) => (
    <p>{props.title}</p>
);

const mapState = (state) => (
    state
);

const mapDispatch = (dispatch) => ({
	loadStories: () => dispatch(stories.action.loadStories()),
    clear: () => dispatch(stories.action.clear())
});

export default connect(mapState, mapDispatch)(Stories);