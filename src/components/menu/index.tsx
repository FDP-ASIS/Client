import React, { FunctionComponent } from 'react';
import { Role, Name, User } from '../../models/user';
import styled from 'styled-components';
import { MenuTab } from './MenuTab';
import { RoutesPath } from '../../routers/routesPath';
import { RouteProps } from 'react-router-dom';
import Strings from '../../utils/strings';

const FillAllPage = styled.div`
	position: relative;
	height: 100%;
	width: 100%;
`;

interface MenuProps {
	user: User;
}
export const Menu: FunctionComponent<RouteProps & MenuProps> = (props) => {
	switch (props.user.role) {
		case Role.STUDENT:
			break;
		case Role.LECTURER:
			break;
		case Role.ADMIN:
			break;
	}

	const helloTo = (name: Name | undefined): string => {
		if (name) return name.first + `${name.middle ? ' ' + name.middle : ''} ` + name.last;
		return '';
	};
	// HELLO
	return (
		<>
			<FillAllPage>
				{Strings.HELLO} {helloTo(props.user.name)}
				<MenuTab name={Strings.PROFILE} link={RoutesPath.Profile} />
			</FillAllPage>
		</>
	);
};
