import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import Auth from "../pages/auth";



const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" component={Auth} />
                <Redirect from="*" to="/" />
            </Switch>
        </Router>
    )
}


export default Routes;