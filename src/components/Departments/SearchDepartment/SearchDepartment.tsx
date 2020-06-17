import * as React from 'react';
import Strings from '../../../utils/strings';
import { H3, Button, Alignment, Intent, InputGroup } from '@blueprintjs/core';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import { Element } from 'react-scroll';

export interface Props {}

export interface State {
	disabled: boolean;
}

const FillAllPage = styled.div`
	position: relative;
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export default class SearchDepartment extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			disabled: false,
		};
	}

	render() {
		const { disabled } = this.state;

		return (
			<FillAllPage>
				<Row gutter={[6, 6]}>
					<Col span={16}>
						<H3>{Strings.SEARCH_DEPARTMENT}</H3>
						<div style={{ marginTop: '5%' }}>
							<Row gutter={[20, 16]}>
								<Col span={3}>{Strings.NAME}</Col>
								<Col span={16}>
									<InputGroup
										id="text-input"
										placeholder={Strings.ENTER_NAME_TO_SEARCH}
										disabled={disabled}
									/>
								</Col>
							</Row>
							<Row gutter={[6, 24]}>
								<Col span={3}>{Strings.CODE}</Col>
								<Col span={16}>
									<InputGroup
										id="text-input"
										placeholder={Strings.ENTER_CODE_TO_SEARCH}
										disabled={disabled}
									/>
								</Col>
							</Row>
							<Row gutter={[6, 20]}>
								<Col span={2} offset={6}>
									<Button
										text={Strings.SEARCH}
										disabled={disabled}
										intent={Intent.PRIMARY}
									/>
								</Col>
								<Col span={2} offset={3}>
									<Button
										text={Strings.CLEAR}
										disabled={disabled}
										intent={Intent.WARNING}
									/>
								</Col>
							</Row>
						</div>
					</Col>
					<Col span={8}>
						<div style={{ marginBottom: '10%' }}>
							<Button
								intent={Intent.SUCCESS}
								alignText={Alignment.LEFT}
								rightIcon={'add'}
								fill={true}
								text={Strings.ADD_NEW_DEPARTMENT}
							/>
						</div>
						<Button
							intent={Intent.DANGER}
							rightIcon={'delete'}
							alignText={Alignment.LEFT}
							fill={true}
							text={Strings.DELETE_ALL_DEPARTMENT}
						/>
					</Col>
				</Row>

				<Element
					name="test7"
					style={{
						flexGrow: 1,
						height: '1px',
						overflow: 'scroll',
					}}
				>
					result
				</Element>
			</FillAllPage>
		);
	}
}
