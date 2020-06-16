import React, { FunctionComponent, useState } from 'react';
import { RoutesPath } from '../../routers/routesPath';
import { RouteProps, useLocation, useHistory } from 'react-router-dom';
import { AnchorButton, Intent, Alert, IconName, Alignment } from '@blueprintjs/core';
import Strings from '../../utils/strings/index';

export interface MenuTabProps {
	name: string;
	link: RoutesPath;
	noPrefix?: boolean;
	onclickPopUp?: string;
	isOpenError?: boolean;
	icon?: IconName;
}

export const MenuTab: FunctionComponent<RouteProps & MenuTabProps> = (props) => {
	const [isOpenError, setIsOpenError] = useState(false);
	let location = useLocation().pathname;
	let history = useHistory();
	let url =
		props.noPrefix !== undefined && props.noPrefix === true
			? props.link.toString()
			: RoutesPath.Dashboard + '/' + props.link.toString();
	if (props.onclickPopUp === undefined)
		return (
			// <NavLink to={url} activeClassName="active">
			<AnchorButton
				alignText={Alignment.LEFT}
				intent={Intent.NONE}
				fill={true}
				large={true}
				active={location.startsWith(url)}
				icon={props.icon}
				onClick={() => history.push(url)}
			>
				{props.name}
			</AnchorButton>
			// </NavLink>
		);
	else {
		return (
			<>
				<Alert
					confirmButtonText={Strings.LOGOUT}
					cancelButtonText={Strings.CANCEL}
					intent={Intent.DANGER}
					canEscapeKeyCancel={true}
					canOutsideClickCancel={true}
					icon={props.icon}
					isOpen={isOpenError}
					onConfirm={() => {
						setIsOpenError(false);
						history.push(props.link);
					}}
					onCancel={() => {
						setIsOpenError(false);
					}}
				>
					<p style={{ color: 'black' }}>{props.onclickPopUp}</p>
				</Alert>
				<AnchorButton
					alignText={Alignment.LEFT}
					intent={Intent.NONE}
					fill={true}
					large={true}
					icon={props.icon}
					active={location.startsWith(url)}
					onClick={() => {
						setIsOpenError(true);
					}}
				>
					{props.name}
				</AnchorButton>
			</>
		);
	}
};
