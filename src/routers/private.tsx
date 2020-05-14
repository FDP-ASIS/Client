import React from 'react';
import { Route, Redirect, RouteComponentProps, RouteProps } from 'react-router-dom';
import { RoutesPath } from './routesPath';

// import { useAuthState } from '../../context/AuthContext';

type PrivateRouteProps = {
	component: React.ComponentType;
} & RouteProps;

export const PrivateRoute: React.SFC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
	//TODO get auth from redux
	const isAuthenticated = true;

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
