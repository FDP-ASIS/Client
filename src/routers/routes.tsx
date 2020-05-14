import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { PublicRoute } from './public';
import Splash from '../pages/splash';
import Login from '../pages/login';

export const Routes: React.SFC = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" render={() => <Redirect to="/splash" />} />
				<PublicRoute path="/splash" component={Splash} restricted />
				<PublicRoute path="/login" component={Login} restricted />
				{/*<PrivateRoute path="/logout" component={Logout} /> */}
				{/* <Route component={Error} /> */}
			</Switch>
		</Router>
	);
};
