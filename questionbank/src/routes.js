import React from "react";
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
import Articles from "./pages/Articles";

const Routes = (props) => (
    <BrowserRouter {...props}>
        <Switch>
            <Route exact path="/articles" Component={Articles} replace />
            <Redirect to='/articles' />
        </Switch>
    </BrowserRouter>
);

export default Routes;