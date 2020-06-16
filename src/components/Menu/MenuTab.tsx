import React, { FunctionComponent } from 'react';
import { RoutesPath } from '../../routers/routesPath';
import { NavLink, RouteProps, useLocation } from 'react-router-dom';
import { AnchorButton, Intent } from '@blueprintjs/core';

export interface MenuTabProps {
	name: string;
	link: RoutesPath;
	noPrefix?: boolean;
}

export const MenuTab: FunctionComponent<RouteProps & MenuTabProps> = (props) => {
	let location = useLocation().pathname;
	let url =
		props.noPrefix !== undefined && props.noPrefix === true
			? props.link.toString()
			: RoutesPath.Dashboard + '/' + props.link.toString();
	return (
		<NavLink to={url} activeClassName="active">
			<AnchorButton intent={Intent.NONE} fill={true} active={location.startsWith(url)}>
				{props.name}
			</AnchorButton>
		</NavLink>
	);
};
