import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { PublicRoute } from './public';
import Splash from '../pages/splash';
import Login from '../pages/login';
import { RoutesPath } from './routesPath';

export const Routes: React.SFC = () => {
	return (
		<Router>
			<Switch>
				<Route
					exact
					path={RoutesPath.Root}
					render={() => <Redirect to={RoutesPath.Splash} />}
				/>
				<PublicRoute path={RoutesPath.Splash} component={Splash} restricted />
				<PublicRoute path={RoutesPath.Login} component={Login} restricted />
				{/*<PrivateRoute path="/logout" component={Logout} /> */}
				{/* <Route component={Error} /> */}
			</Switch>
		</Router>
	);
};
