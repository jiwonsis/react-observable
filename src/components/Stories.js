import * as React from 'react';
import {connect} from 'react-redux';
import {loadStories, clear} from "../actions";

export const Stories = (props) => (
    <React.Fragment>
        <button type="button" onClick={props.loadStories}>상위 3개 스토리 불러오기</button>
        <button type="button" onClick={props.clear}>초기화</button>
        <StoryList {...props} />
    </React.Fragment>
);

const StoryList = (props) => (
    props.items.length === 0 ?
        null :
        <React.Fragment>
            {props.items.map(item => <Story {...item} key={item.id} />)}
        </React.Fragment>
);

const Story = (props) => (
    <p>{props.title}</p>
);

const mapState = (state) => (
    state
);

const mapDispatch = (dispatch) => ({
    loadStories: () => dispatch(loadStories()),
    clear: () => dispatch(clear())
});

export default connect(mapState, mapDispatch)(Stories);