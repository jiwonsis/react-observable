import React, {Fragment} from 'react';
import {
    Route,
} from 'react-router-dom';
import Step1 from "./pages/Step1";
import Step2 from "./pages/Step2";
import Step3 from "./pages/Step3";
import Step4 from "./pages/Step4";

const App = () => (
    <Fragment>
        <Route path="/step1" component={Step1}/>
        <Route path="/step2" component={Step2}/>
	    <Route path="/step3" component={Step3}/>
	    <Route path="/step4" component={Step4}/>
    </Fragment>
);

export default App;
