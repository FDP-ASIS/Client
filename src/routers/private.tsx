import React from 'react';
import { Route, Redirect, RouteComponentProps, RouteProps } from 'react-router-dom';
import { RoutesPath } from './routesPath';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/reducers/user';
import { Role } from '../models/user';

type PrivateRouteProps = {
	component: React.ComponentType;
	onlyRole?: Role[];
} & RouteProps;

export const PrivateRoute: React.SFC<PrivateRouteProps> = ({
	component: Component,
	onlyRole,
	...rest
}) => {
	const user = useSelector(selectUser);
	const isAuthenticated = user != null && (onlyRole ? onlyRole.includes(user.role) : true);

	return (
		// Show the component only when the user is logged in
		// Otherwise, redirect the user to /login page
		<Route
			{...rest}
			render={(props: RouteComponentProps) =>
				isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: RoutesPath.Login,
							state: {
								from: props.location,
							},
						}}
					/>
				)
			}
		/>
	);
};
