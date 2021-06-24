import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import Auth from "../pages/auth";
import Markets from "../pages/markets";
import AddMarket from "../pages/markets/Add";



const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/markets/add" component={AddMarket} />
                <Route path="/markets" component={Markets} />
                <Route path="/" component={Auth} />
                <Redirect from="*" to="/" />
            </Switch>
        </Router>
    )
}


export default Routes;