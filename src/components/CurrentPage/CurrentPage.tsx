import React, { FunctionComponent } from 'react';
import { Switch } from 'react-router-dom';
import { RoutesPath } from '../../routers/routesPath';
import { PrivateRoute } from '../../routers/private';
import { dashRoutes } from './pages';

export const CurrentPage: FunctionComponent<{}> = () => {
	const addToCurrent = (toPath: RoutesPath) => RoutesPath.Dashboard + '/' + toPath;

	return (
		<Switch>
			{dashRoutes.map((route, key) => {
				return (
					<PrivateRoute
						key={key}
						path={addToCurrent(route.path)}
						component={route.component}
						onlyRole={route.onlyRole}
					/>
				);
			})}
		</Switch>
	);
};
