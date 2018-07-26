import * as React from 'react';
import { connect } from 'react-redux';

export const Stories = (props) => (
    <pre>
        <code>
            {JSON.stringify(props, null, 2)}
        </code>
    </pre>
);

const mapState = (state) => (
    state
);

export default connect(mapState)(Stories);