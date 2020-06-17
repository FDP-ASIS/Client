import React, { useEffect } from 'react';
import styled from 'styled-components';
import ReactLoading from 'react-loading';

import { logMeOut } from '../utils/auth';
import { connect } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { removeUser } from '../redux/reducers/user';
import Strings from '../utils/strings';
import { H2 } from '@blueprintjs/core';

const Center = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
`;

const Article = styled('div')`
	text-align: center;
	display: flex;
	place-content: center;
`;

const H2Color = styled(H2)`
	color: white;
	margin-bottom: 20%;
`;

interface LoginComponentProps {
	actions: { removeCurrentUser: () => ReturnType<AppDispatch> };
}

export const Logout: React.FunctionComponent<LoginComponentProps> = (props) => {
	const LOGOUT_TIME = 5000;
	let timeoutId: number;

	useEffect(() => {
		logMeOut().finally(
			// eslint-disable-next-line react-hooks/exhaustive-deps
			() => (timeoutId = setTimeout(() => props.actions.removeCurrentUser(), LOGOUT_TIME))
		);
		return () => {
			clearTimeout(timeoutId);
		};
	});

	return (
		<Center>
			<H2Color>{Strings.LOGOUT_WAITING}</H2Color>
			<Article>
				<ReactLoading
					type={'spinningBubbles'}
					color="white"
					height={'20%'}
					width={'20%'}
					delay={500}
				/>
			</Article>
		</Center>
	);
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
	return {
		actions: {
			removeCurrentUser: () => dispatch(removeUser()),
		},
	};
};

export default connect(null, mapDispatchToProps)(Logout);
