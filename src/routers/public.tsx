import React from 'react';
import { Route, Redirect, RouteComponentProps, RouteProps } from 'react-router-dom';
import { RoutesPath } from './routesPath';
// import { useAuthState } from '../../context/AuthContext';

type PublicRouteProps = {
	component: React.ComponentType;
	restricted?: boolean;
} & RouteProps;

export const PublicRoute: React.SFC<PublicRouteProps> = ({
	component: Component,
	restricted = false,
	...rest
}) => {
	//TODO get auth from redux
	const isAuthenticated = false;
	if (!Component) throw Error('Missing components - Public route');
	return (
		// restricted = false meaning public route
		// restricted = true meaning restricted route
		<Route
			{...rest}
			render={(props: RouteComponentProps) =>
				isAuthenticated && restricted ? (
					<Redirect to={RoutesPath.Dashboard} />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};
