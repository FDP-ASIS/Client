import React from 'react';
import { Route, Redirect, RouteComponentProps, RouteProps } from 'react-router-dom';
import { RoutesPath } from './routesPath';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/reducers/user';
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
	const isAuthenticated = useSelector(selectUser) != null;

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
