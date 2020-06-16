import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/reducers/user';
import { Role } from '../../models/user';
import styled from 'styled-components';
import { MenuTab } from './MenuTab';
import { RoutesPath } from '../../routers/routesPath';
import { RouteProps } from 'react-router-dom';
// import { String } from "../../utils/strings/english";

const FillAllPage = styled.div`
	position: relative;
	height: 100%;
	width: 100%;
`;

export const Menu: FunctionComponent<RouteProps> = (props) => {
	const user = useSelector(selectUser);

	switch (user?.role) {
		case Role.STUDENT:
			break;
		case Role.LECTURER:
			break;
		case Role.ADMIN:
			break;
	}
	// HELLO
	return (
		<>
			Hello,
			<FillAllPage>
				<MenuTab name="Profile" link={RoutesPath.Profile} />
			</FillAllPage>
		</>
	);
};
