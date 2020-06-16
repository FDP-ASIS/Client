import React, { FunctionComponent } from 'react';
import { Name, User, Role } from '../../models/user';
import styled from 'styled-components';
import { MenuTab, MenuTabProps } from './MenuTab';
import { RoutesPath } from '../../routers/routesPath';
import Strings from '../../utils/strings';
import { getMenu } from './menuRole';
import { H3, H5 } from '@blueprintjs/core';
import { useLocation, useHistory } from 'react-router-dom';

const FillAllPage = styled.div`
	position: relative;
	height: 100%;
	width: 100%;
	box-shadow: 10px 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

interface MenuProps {
	user: User;
}

const Hello = styled('div')`
	padding: 10px;
	margin-bottom: 5%;
	text-align: center;
`;

const H3Color = styled(H3)`
	color: white;
	margin-bottom: 5%;
`;

const H5Color = styled(H5)`
	color: white;
`;

export const Menu: FunctionComponent<MenuProps> = (props) => {
	let menu: MenuTabProps[] = getMenu(props.user.role);
	const location = useLocation().pathname;
	const history = useHistory();
	const helloTo = (name: Name | undefined): string => {
		if (name) return name.first + `${name.middle ? ' ' + name.middle : ''} ` + name.last;
		return '';
	};
	switch (props.user.role) {
		case Role.STUDENT:
			if (location.endsWith(RoutesPath.Dashboard.toString()))
				history.replace(RoutesPath.Dashboard + '/' + RoutesPath.MyCourses);
			break;
		case Role.LECTURER:
			if (location.endsWith(RoutesPath.Dashboard.toString()))
				history.replace(RoutesPath.Dashboard + '/' + RoutesPath.MyCourses);
			break;
		case Role.ADMIN:
			if (location.endsWith(RoutesPath.Dashboard.toString()))
				history.replace(RoutesPath.Dashboard + '/' + RoutesPath.Users);
			break;
	}
	return (
		<>
			<FillAllPage>
				<Hello>
					<H3Color>{Strings.HELLO}</H3Color>
					<H5Color>{helloTo(props.user.name)}</H5Color>
				</Hello>
				{menu.map((menuTabProps, key) => {
					return (
						<MenuTab
							key={key}
							name={menuTabProps.name}
							link={menuTabProps.link}
							icon={menuTabProps.icon}
						/>
					);
				})}
				<MenuTab name={Strings.PROFILE} link={RoutesPath.Profile} icon="user" />
				<MenuTab name={Strings.ABOUT_US} link={RoutesPath.AboutUs} icon={'code'} />
				<MenuTab
					name={Strings.LOGOUT}
					link={RoutesPath.Logout}
					noPrefix={true}
					onclickPopUp={Strings.LOGOUT_U_SURE}
					icon={'log-out'}
				/>
			</FillAllPage>
		</>
	);
};
