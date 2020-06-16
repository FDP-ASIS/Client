import React, { FunctionComponent } from 'react';
import { Name, User } from '../../models/user';
import styled from 'styled-components';
import { MenuTab, MenuTabProps } from './MenuTab';
import { RoutesPath } from '../../routers/routesPath';
import Strings from '../../utils/strings';
import { getMenu } from './menuRole';

const FillAllPage = styled.div`
	position: relative;
	height: 100%;
	width: 100%;
`;

interface MenuProps {
	user: User;
}

export const Menu: FunctionComponent<MenuProps> = (props) => {
	let menu: MenuTabProps[] = getMenu(props.user.role);
	// let { path } = useRouteMatch();
	// const moveTo = (route: RoutesPath): string => {
	// return RoutesPath.Dashboard + '/' + route;
	// };
	// if (path.match(RoutesPath.Dashboard)) moveTo(RoutesPath.MyCourses);

	const helloTo = (name: Name | undefined): string => {
		if (name) return name.first + `${name.middle ? ' ' + name.middle : ''} ` + name.last;
		return '';
	};
	return (
		<>
			<FillAllPage>
				{Strings.HELLO} {helloTo(props.user.name)}
				{menu.map((menuTabProps) => {
					return <MenuTab name={menuTabProps.name} link={menuTabProps.link} />;
				})}
				<MenuTab name={Strings.PROFILE} link={RoutesPath.Profile} />
				<MenuTab name={Strings.ABOUT_US} link={RoutesPath.AboutUs} />
				<MenuTab name={Strings.LOGOUT} link={RoutesPath.Logout} noPrefix={true} />
			</FillAllPage>
		</>
	);
};
