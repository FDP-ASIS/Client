import React, { FunctionComponent } from 'react';
import { RoutesPath } from '../../routers/routesPath';
import { NavLink, RouteProps, useRouteMatch } from 'react-router-dom';
import { AnchorButton, Intent } from '@blueprintjs/core';

interface MenuTabProps {
	name: string;
	link: RoutesPath;
}

export const MenuTab: FunctionComponent<RouteProps & MenuTabProps> = (props) => {
	let { path } = useRouteMatch();

	return (
		<NavLink to={path + props.link.toString()} activeClassName="nav-selected">
			<AnchorButton intent={Intent.NONE} fill={true}>
				{props.name}
			</AnchorButton>
		</NavLink>
	);
};
