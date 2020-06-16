import React, { FunctionComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import { RoutesPath } from '../../routers/routesPath';
import AboutUs from '../AboutUs';
import Profile from '../Profile';

export const CurrentPage: FunctionComponent<{}> = () => {
	const addToCurrent = (toPath: RoutesPath) => RoutesPath.Dashboard + '/' + toPath;

	return (
		<Switch>
			<Route path={addToCurrent(RoutesPath.Profile)}>
				<Profile />
			</Route>
			<Route path={addToCurrent(RoutesPath.AboutUs)}>
				<AboutUs />
			</Route>
		</Switch>
	);
};
