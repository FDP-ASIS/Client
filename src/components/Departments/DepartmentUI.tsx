import * as React from 'react';
import Strings from '../../utils/strings';
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
	Overlay,
	Classes,
} from '@blueprintjs/core';
import styled from 'styled-components';
import { Table, Empty, Row, Col, Space } from 'antd';
import classNames from 'classnames';
import {
	EditableCell,
	Column as AddColumn,
	Table as AddTable,
	TableLoadingOption,
} from '@blueprintjs/table';

// import { Element } from 'react-scroll';
import { Department } from '../../models/department';
import { readDepartmentCSV } from '../../utils/readCSV';

const { Column } = Table;

export interface Props {}
export interface Key {
	key?: number;
}

export interface State {
	loading: boolean;
	data: (Department & Key)[];
	addData: (Department & Key)[];
	clicked: boolean;
	currentPage: number;
	hasNextPage: boolean;
	isOpenAlert: boolean;
	delete: number | null;
	OverlayIsOpen: boolean;
	currentDepartment: null | Department;
}

const OVERLAY_CLASS = 'overlay-transition';

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

export default class DepartmentUI extends React.Component<Props, State> {
	inputReference: React.RefObject<HTMLInputElement> = React.createRef();

	constructor(props: Props) {
		super(props);

		this.state = {
			loading: false,
			clicked: false,
			currentPage: 0,
			hasNextPage: false,
			isOpenAlert: false,
			delete: null,
			OverlayIsOpen: true,
			currentDepartment: null,
			addData: [],
			data: [
				new Department('software1', 110),
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
				new Department('software1', 110),
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
				new Department('software1', 110),
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
				new Department('software1', 110),
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
				new Department('software1', 110),
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
			],
		};
	}
	fileUploadAction = () => this.inputReference!.current!.click();

	fileUploadInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (this.inputReference?.current?.files?.length) {
			this.setState({
				loading: true,
			});
			readDepartmentCSV(this.inputReference.current.files[0].path)
				.then((res) => {
					this.setState({ addData: res });
				})
				.catch()
				.finally(() => {
					this.setState({
						loading: false,
					});
				});
		}
	};

	search = () => {
		this.setState({ clicked: true });
	};

	clear = () => {
		this.setState({ clicked: false, data: [] });
	};

	delete = (id: number | null = null) => {
		this.setState({
			isOpenAlert: true,
			delete: id,
		});
	};

	edit = (department: Department) => {
		this.setState({
			OverlayIsOpen: true,
			currentDepartment: department,
		});
		console.log(department.code);
	};

	deleteConfirm = () => {
		let deleteId = this.state.delete!;
		console.log(deleteId);
		this.setState({
			isOpenAlert: false,
			delete: null,
		});
	};

	closeOverlay = () => {
		this.setState({
			OverlayIsOpen: false,
			currentDepartment: null,
			addData: [] as Department[],
		});
	};

	changeAddRow = (value: string, rowIndex: number, columnIndex: number) => {
		let department = this.state.addData[rowIndex!];
		switch (columnIndex) {
			case 0:
				department.name = value;
				break;
			case 1:
				department.code = +value;
				break;
		}
		console.log(this.state.addData);
		// this.forceUpdate();
	};

	cellRenderer = (rowIndex: number, columnIndex: number) => {
		if (this.state.addData.length) {
			let value: string | number | undefined;
			let department = this.state.addData[rowIndex];
			console.log(this.state.addData);
			switch (columnIndex) {
				case 0:
					value = department.name;
					break;
				case 1:
					value = department.code;
					break;
			}
			return (
				<EditableCell
					loading={this.state.loading}
					onChange={(value) => this.changeAddRow(value, rowIndex, columnIndex)}
					value={value ? value.toString() : undefined}
				/>
			);
		}
		return <EditableCell />;
	};

	addNewRow = () => {
		this.state.addData.push(new Department());
		this.setState({
			addData: this.state.addData,
		});
	};

	render() {
		const {
			loading,
			data,
			clicked,
			currentPage,
			hasNextPage,
			isOpenAlert,
			OverlayIsOpen,
			currentDepartment,
			addData,
		} = this.state;

		data.map((record) => (record.key = record.code));

		const classes = classNames(Classes.CARD, Classes.ELEVATION_4, OVERLAY_CLASS);

		return (
			<>
				<Overlay isOpen={OverlayIsOpen} usePortal>
					<div className={classes} style={{ color: 'black' }}>
						{currentDepartment ? (
							<>
								<H3 style={{ marginBottom: '20px' }}>{Strings.EDIT_DEPARTMENT}</H3>
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
							</>
						) : (
							<>
								<Row>
									<Col span={10}>
										<H3 style={{ marginBottom: '20px' }}>
											{Strings.ADD_DEPARTMENT}
										</H3>
									</Col>
									<Col span={6} offset={8} style={{ marginBottom: '5%' }}>
										<div style={{ marginBottom: '10%' }}>
											<Button
												intent={Intent.SUCCESS}
												alignText={Alignment.LEFT}
												rightIcon={'add'}
												fill={true}
												disabled={loading}
												text={Strings.ADD_NEW_ROW}
												onClick={() => this.addNewRow()}
											/>
										</div>
										<input
											type="file"
											accept={'.csv'}
											hidden
											ref={this.inputReference}
											onChange={this.fileUploadInputChange}
										/>
										<Button
											intent={Intent.PRIMARY}
											rightIcon={'import'}
											alignText={Alignment.LEFT}
											fill={true}
											disabled={loading}
											text={Strings.IMPORT_FILE}
											onClick={this.fileUploadAction}
										/>
									</Col>
								</Row>
								<div
									style={{
										height: '350px',
									}}
								>
									<AddTable
										numRows={addData.length}
										loadingOptions={
											loading
												? [
														TableLoadingOption.CELLS,
														TableLoadingOption.COLUMN_HEADERS,
														TableLoadingOption.ROW_HEADERS,
												  ]
												: []
										}
									>
										<AddColumn
											name={Strings.NAME}
											cellRenderer={this.cellRenderer}
										/>
										<AddColumn
											name={Strings.CODE}
											cellRenderer={this.cellRenderer}
										/>
									</AddTable>
								</div>
							</>
						)}
						<div
							className={Classes.DIALOG_FOOTER_ACTIONS}
							style={{ marginTop: '20px' }}
						>
							<Button
								intent={Intent.DANGER}
								onClick={() => this.closeOverlay()}
								style={{ margin: '' }}
							>
								{Strings.CLOSE}
							</Button>
							<Button intent={Intent.PRIMARY} style={{ margin: '' }}>
								{Strings.SAVE}
							</Button>
						</div>
					</div>
				</Overlay>

				<Alert
					confirmButtonText={Strings.YES}
					cancelButtonText={Strings.CANCEL}
					intent={Intent.DANGER}
					canEscapeKeyCancel
					canOutsideClickCancel
					icon="trash"
					isOpen={isOpenAlert}
					onConfirm={() => {
						this.deleteConfirm();
					}}
					onCancel={() => {
						this.setState({
							isOpenAlert: false,
						});
					}}
				>
					<p style={{ color: 'black' }}>{Strings.ARE_YOU_SURE}</p>
				</Alert>
				<FillAllPage>
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
									onClick={() =>
										this.setState({
											OverlayIsOpen: true,
										})
									}
								/>
							</div>
							<Button
								intent={Intent.DANGER}
								rightIcon={'trash'}
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
								bordered
								size="small"
								dataSource={data}
								scroll={{ x: true, y: 320 }}
								pagination={false}
								style={{ marginBottom: 20 }}
							>
								<Column title={Strings.NAME} dataIndex="name" key="name" />
								<Column title={Strings.CODE} dataIndex="code" key="code" />
								<Column
									align="center"
									title={Strings.ACTIONS}
									key="action"
									render={(text, record: Department) => (
										<Space size="middle">
											<Button
												text={Strings.EDIT}
												intent={Intent.WARNING}
												onClick={() => this.edit(record)}
											/>
											<Button
												text={Strings.DELETE}
												intent={Intent.DANGER}
												onClick={() => this.delete(record.code)}
											/>
										</Space>
									)}
								/>
							</Table>
							<Row gutter={[6, 6]} justify="end">
								<Col>
									<Button
										text={`< ${Strings.PREV}`}
										disabled={currentPage === 0}
									/>
								</Col>
								<Col>
									<Button text={`${Strings.NEXT} >`} disabled={hasNextPage} />
								</Col>
							</Row>
						</>
						// </Element>
					)}
				</FillAllPage>
			</>
		);
	}
}
