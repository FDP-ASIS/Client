import * as React from 'react';
import Strings from '../../utils/strings';
import { H3 } from '@blueprintjs/core';
import styled from 'styled-components';

export interface Props {
	children?: React.ReactNode;
}

export interface State {}

const FillAllPage = styled.div`
	position: relative;
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const H3Align = styled(H3)`
	text-align: center;
`;

export default class Settings extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<>
				<FillAllPage>
					<H3Align> {Strings.SETTINGS} </H3Align>
				</FillAllPage>
			</>
		);
	}
}
