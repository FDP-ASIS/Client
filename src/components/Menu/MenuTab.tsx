import React, { FunctionComponent } from 'react';
import { RoutesPath } from '../../routers/routesPath';
import { NavLink, RouteProps, useRouteMatch } from 'react-router-dom';
import { AnchorButton, Intent } from '@blueprintjs/core';

export interface MenuTabProps {
	name: string;
	link: RoutesPath;
}

export const MenuTab: FunctionComponent<RouteProps & MenuTabProps> = (props) => {
	let { path } = useRouteMatch();
	let url = RoutesPath.Dashboard + '/' + props.link.toString();
	console.log(path);
	console.log(url);
	console.log(path.startsWith(url));
	return (
		<NavLink to={url} activeClassName="active">
			<AnchorButton intent={Intent.NONE} fill={true} active={path.startsWith(url)}>
				{props.name}
			</AnchorButton>
		</NavLink>
	);
};
