import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { PublicRoute } from './public';
import Splash from '../pages/Splash';
import Login from '../pages/Login';
import { RoutesPath } from './routesPath';
import { PrivateRoute } from './private';
import { Dashboard } from '../pages/Dashboard';
import Logout from '../pages/Logout';

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
				<PrivateRoute path={RoutesPath.Dashboard} component={Dashboard} />
				<PrivateRoute path={RoutesPath.Logout} component={Logout} />
				{/* <Route component={Error} /> */}
			</Switch>
		</Router>
	);
};
