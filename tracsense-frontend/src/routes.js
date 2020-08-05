import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from "./services/auth";

import Logon from './pages/Home';
import MapPage from './pages/Map';

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={ props => 
			{
				if(isAuthenticated()) {
					return (
						<Component {...props} />
					)
				} else {
					return(
						<Redirect to={{ pathname: "/", state: { from: props.location } }} />
					)
				}
			}
		}
	/>
);

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon}/>
                <PrivateRoute path="/map" component={MapPage}/>
            </Switch>
        </BrowserRouter>
    );
}