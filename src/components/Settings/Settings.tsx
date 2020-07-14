import * as React from 'react';
import Strings from '../../utils/strings';
import { H3, H4, Icon, InputGroup } from '@blueprintjs/core';
import styled from 'styled-components';
import sharedEnvironment from '../../../package.json';
import { Col, Row } from 'antd';

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

const H4Color = styled(H4)`
	color: navy;
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
					<div style={{ marginTop: '10%' }}>
						<Col span={20}>
							<Row>
								<Col span={7}>
									<Icon icon={'info-sign'} iconSize={20} />
								</Col>
							</Row>

							<Row>
								<Col span={7}>
									<H4Color> {Strings.VERSION} </H4Color>
								</Col>

								<Col span={15}>
									<InputGroup value={sharedEnvironment.version} disabled />
								</Col>
							</Row>

							<div style={{ marginTop: '30px' }}>
								<Row>
									<Col span={7}>
										<Icon icon={'box'} iconSize={20} />
									</Col>
								</Row>

								<Row>
									<Col span={7}>
										<H4Color> {Strings.SUPPORT} </H4Color>
									</Col>

									<Col span={15}>
										<InputGroup
											value={sharedEnvironment.author.email}
											disabled
										/>
									</Col>
								</Row>
							</div>
						</Col>
					</div>
				</FillAllPage>
			</>
		);
	}
}
