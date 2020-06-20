import * as React from 'react';
import Strings from '../../../utils/strings';
import {
	H3,
	H2,
	Button,
	Alignment,
	Intent,
	InputGroup,
	NumericInput,
	Spinner,
	Alert,
} from '@blueprintjs/core';
import styled from 'styled-components';
import { Table, Empty, Row, Col, Space } from 'antd';
// import { Element } from 'react-scroll';
import { Department } from '../../../models/department';

const { Column } = Table;

export interface Props {}

export interface State {
	loading: boolean;
	data: Department[];
	clicked: boolean;
	currentPage: number;
	hasNextPage: boolean;
	isOpenAlert: boolean;
}

const FillAllPage = styled.div`
	position: relative;
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const Center = styled(H2)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	margin: auto;
	flex-grow: 1;
	text-align: center;
`;
export default class SearchDepartment extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			loading: false,
			clicked: false,
			currentPage: 0,
			hasNextPage: false,
			isOpenAlert: false,
			data: [
				new Department('software', 10),
				new Department('test', 20),
				new Department('software', 10),
				new Department('test', 20),
				new Department('software', 10),
				new Department('test', 20),
				new Department('software', 10),
				new Department('test', 20),
				new Department('software', 10),
				new Department('test', 20),
				new Department('software', 10),
				new Department('test', 20),
				new Department('software', 10),
				new Department('test', 20),
				new Department('software', 10),
				new Department('test', 20),
				new Department('software', 10),
				new Department('test', 20),
				new Department('software', 10),
				new Department('test', 20),
				new Department('software', 10),
				new Department('test', 20),
				new Department('software', 10),
				new Department('test', 20),
				new Department('software', 10),
				new Department('test', 20),
				new Department('software', 10),
				new Department('test', 20),
				new Department('software', 10),
				new Department('test', 20),
				new Department('software', 10),
				new Department('test', 20),
				new Department('software', 10),
				new Department('test', 20),
				new Department('software', 10),
				new Department('test', 20),
				new Department('software', 10),
				new Department('test', 20),
			],
		};
	}

	search = () => {
		this.setState({ clicked: true });
	};

	clear = () => {
		this.setState({ clicked: false });
	};

	render() {
		const { loading, data, clicked, currentPage, hasNextPage, isOpenAlert } = this.state;

		return (
			<FillAllPage>
				<Alert
					confirmButtonText={Strings.YES}
					cancelButtonText={Strings.CANCEL}
					intent={Intent.DANGER}
					canEscapeKeyCancel
					canOutsideClickCancel
					icon="trash"
					isOpen={isOpenAlert}
					onConfirm={() => {
						this.setState({
							isOpenAlert: false,
						});
						// TODO send request to delete
					}}
					onCancel={() => {
						this.setState({
							isOpenAlert: false,
						});
					}}
				>
					<p style={{ color: 'black' }}>{Strings.ARE_YOU_SURE}</p>
				</Alert>
				<Row gutter={[6, 6]}>
					<Col span={16}>
						<H3>{Strings.SEARCH_DEPARTMENT}</H3>
						<div style={{ marginTop: '5%' }}>
							<Row gutter={[20, 16]}>
								<Col span={3}>{Strings.NAME}:</Col>
								<Col span={16}>
									<InputGroup
										placeholder={Strings.ENTER_NAME_TO_SEARCH}
										disabled={loading}
									/>
								</Col>
							</Row>
							<Row gutter={[6, 24]}>
								<Col span={3}>{Strings.CODE}:</Col>
								<Col span={16}>
									<NumericInput
										allowNumericCharactersOnly={true}
										fill={true}
										placeholder={Strings.ENTER_CODE_TO_SEARCH}
										disabled={loading}
										min={0}
									/>
								</Col>
							</Row>
							<Row gutter={[6, 20]}>
								<Col span={2} offset={6}>
									<Button
										text={Strings.SEARCH}
										disabled={loading}
										intent={Intent.PRIMARY}
										onClick={this.search}
									/>
								</Col>
								<Col span={2} offset={3}>
									<Button
										text={Strings.CLEAR}
										disabled={loading}
										intent={Intent.WARNING}
										onClick={this.clear}
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
								disabled={loading}
								text={Strings.ADD_NEW_DEPARTMENT}
							/>
						</div>
						<Button
							intent={Intent.DANGER}
							rightIcon={'delete'}
							alignText={Alignment.LEFT}
							fill={true}
							disabled={loading}
							text={Strings.DELETE_ALL_DEPARTMENT}
							onClick={() =>
								this.setState({
									isOpenAlert: true,
								})
							}
						/>
					</Col>
				</Row>

				{loading ? (
					<Center>
						<Spinner />
					</Center>
				) : data.length === 0 ? (
					clicked ? (
						<Center>
							<Empty description={Strings.NO_RESULT_FOUND} />
						</Center>
					) : null
				) : (
					// <Element
					// 	name="search"
					// 	style={{
					// 		flexGrow: 1,
					// 		height: '1px',
					// 		// overflow: 'scroll',
					// 	}}
					// >
					<>
						<Table
							dataSource={data}
							scroll={{ x: true, y: 320 }}
							pagination={false}
							style={{ marginBottom: 20 }}
						>
							<Column title={Strings.NAME} dataIndex="name" key="name" />
							<Column title={Strings.CODE} dataIndex="code" key="code" />
							<Column
								title="Action"
								key="action"
								render={(text, record: Department) => (
									<Space size="middle">
										<Button
											text={Strings.EDIT}
											intent={Intent.WARNING}
											onClick={() => console.log(record.code)}
										/>
										<Button text={Strings.DELETE} intent={Intent.DANGER} />
									</Space>
								)}
							/>
						</Table>
						<Row gutter={[6, 6]} justify="end">
							<Col>
								<Button text={`< ${Strings.PREV}`} disabled={currentPage === 0} />
							</Col>
							<Col>
								<Button text={`${Strings.NEXT} >`} disabled={hasNextPage} />
							</Col>
						</Row>
					</>
					// </Element>
				)}
			</FillAllPage>
		);
	}
}
// <Table
// 	style={{
// 		marginBottom: '20px',
// 	}}
// 	bordered
// 	size="small"
// 	pagination={false}
// 	scroll={{
// 		y: 320,
// 		x: true,
// 	}}
// 	columns={columns}
// 	dataSource={data}
// >
