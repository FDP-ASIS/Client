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
	Toaster,
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

import { User, Name, Role } from '../../models/user';
import { readUserCSV } from '../../utils/readCSV';
import { UserApi } from '../../api/user';
import { IconName } from '@blueprintjs/core';
import ColumnGroup from 'antd/lib/table/ColumnGroup';

const { Column } = Table;

export interface Props {}
export interface Key {
	key?: number;
}

export interface State {
	loading: boolean;
	data: (User & Key)[];
	addData: (User & Key)[];
	clicked: boolean;
	currentPage: number;
	hasNextPage: boolean;
	isOpenAlert: boolean;
	OverlayIsOpen: boolean;
	currentUserID?: string;
	currentUser: null | User;
	addDataRole: Role | null;
	searchID: string;
}

const OVERLAY_CLASS = 'overlay-transition';

const FillAllPage = styled.div`
	position: relative;
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const CenterPage = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
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

const CenterMe = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export default class UserUI extends React.Component<Props, State> {
	inputReference: React.RefObject<HTMLInputElement> = React.createRef();
	userApi: UserApi;

	constructor(props: Props) {
		super(props);
		this.userApi = new UserApi();
		this.state = {
			searchID: '',
			loading: false,
			clicked: false,
			currentPage: 0,
			hasNextPage: false,
			isOpenAlert: false,
			OverlayIsOpen: false,
			currentUser: null,
			addDataRole: null,
			addData: [],
			data: [],
		};
	}
	fileUploadAction = () => this.inputReference!.current!.click();

	fileUploadInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (this.inputReference?.current?.files?.length) {
			this.setState({
				loading: true,
			});
			readUserCSV(this.inputReference.current.files[0].path)
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
	private toaster: Toaster | undefined;

	private addToast = (reason: string, color: Intent, icon: IconName) => {
		if (this.toaster) this.toaster.show({ message: reason, intent: color, icon: icon });
	};

	createAllUsers = () => {
		if (this.state.addData.length) {
			this.setState({
				loading: true,
			});
			this.userApi
				.register(this.state.addData, this.state.addDataRole!)
				.then(() => {
					this.closeOverlay();
					this.addToast(Strings.CREATED, Intent.SUCCESS, 'saved');
				})
				.catch((error) => {
					console.log(error);
					this.addToast(Strings.CHECK_YOUR_INFO, Intent.WARNING, 'issue');
				})
				.finally(() => {
					this.setState({
						loading: false,
					});
				});
		} else {
			this.addToast(Strings.ENTER_ONE_ROW, Intent.DANGER, 'issue');
		}
	};

	search = () => {
		const { searchID } = this.state;
		this.setState({ loading: true, clicked: true });
		this.userApi
			.getUser(searchID!)
			.then((result) => {
				this.setState({ data: [result] });
			})
			.finally(() => this.setState({ loading: false }));
	};

	clear = () => {
		this.setState({ data: [], clicked: false });
	};

	delete = (id: string | undefined = undefined) => {
		this.setState({
			isOpenAlert: true,
			currentUserID: id,
		});
	};

	edit = (user: User) => {
		this.setState({
			OverlayIsOpen: true,
			currentUser: new User(
				user.id,
				new Name(user.name.first, user.name.last),
				user.username,
				user.email,
				user.role
			),
			currentUserID: user.id,
		});
	};

	editUser = () => {
		this.setState({
			loading: true,
		});
		console.log(this.state.currentUser, this.state.currentUserID);
		this.userApi
			.updateUser(this.state.currentUserID!, this.state.currentUser!)
			.then(() => {
				this.search();
				this.closeOverlay();
				this.addToast(Strings.CREATED, Intent.SUCCESS, 'saved');
			})
			.catch((error) => {
				console.log(error);
				this.addToast(Strings.CHECK_YOUR_INFO, Intent.WARNING, 'issue');
			})
			.finally(() => {
				this.setState({
					loading: false,
				});
			});
	};

	deleteConfirm = () => {
		let deleteId = this.state.currentUserID!;
		if (deleteId) this.userApi.deleteUser(deleteId);
		else this.userApi.deleteUsers();
		this.setState({
			isOpenAlert: false,
			currentUserID: undefined,
			data: [],
			clicked: false,
			searchID: '',
		});
	};

	closeOverlay = () => {
		this.setState({
			OverlayIsOpen: false,
			currentUser: null,
			addData: [] as User[],
		});
	};

	changeAddRow = (value: string, rowIndex: number, columnIndex: number) => {
		let user = this.state.addData[rowIndex!];
		switch (columnIndex) {
			case 0:
				user.id = value;
				break;
			case 1:
				user.name.first = value;
				break;
			case 2:
				user.name.last = value;
				break;
			case 3:
				user.username = value;
				break;
			case 4:
				user.email = value;
				break;
		}
		// this.forceUpdate();
	};

	cellRenderer = (rowIndex: number, columnIndex: number) => {
		if (this.state.addData.length) {
			let value: string | number | undefined;
			let user = this.state.addData[rowIndex];
			switch (columnIndex) {
				case 0:
					value = user.id;
					break;
				case 1:
					value = user.name.first;
					break;
				case 2:
					value = user.name.last;
					break;
				case 3:
					value = user.username;
					break;
				case 4:
					value = user.email;
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
		this.state.addData.push(new User());
		this.setState({
			addData: this.state.addData,
		});
	};

	render() {
		const {
			loading,
			data,
			currentPage,
			hasNextPage,
			isOpenAlert,
			OverlayIsOpen,
			currentUser,
			addData,
			clicked,
			searchID,
		} = this.state;

		data.map((record, index) => (record.key = index));

		const classes = classNames(Classes.CARD, Classes.ELEVATION_4, OVERLAY_CLASS);

		return (
			<>
				<Toaster
					position="top"
					canEscapeKeyClear={true}
					maxToasts={1}
					ref={(ref: Toaster) => (this.toaster = ref)}
				/>
				<Overlay isOpen={OverlayIsOpen} usePortal>
					<div className={classes} style={{ color: 'black' }}>
						{currentUser ? (
							<>
								<H3 style={{ marginBottom: '20px' }}>{Strings.EDIT_USER}</H3>
								<>
									<Row gutter={[20, 16]}>
										<Col span={3}>
											<CenterMe>{Strings.ID}:</CenterMe>
										</Col>
										<Col span={16}>
											<InputGroup
												placeholder={Strings.ENTER_ID}
												disabled={loading}
												value={currentUser.id}
												onChange={(event: any) => {
													currentUser.id = event.target!.value;
													this.setState({
														currentUser: currentUser,
													});
												}}
											/>
										</Col>
									</Row>
									<Row gutter={[20, 16]}>
										<Col span={3}>
											<CenterMe>{Strings.NAME}:</CenterMe>
										</Col>
										<Col span={16}>
											<Row gutter={[20, 16]}>
												<Col span={3}>
													<CenterMe>{Strings.FIRST_NAME}:</CenterMe>
												</Col>
												<Col>
													<InputGroup
														placeholder={Strings.ENTER_FIRST_NAME}
														disabled={loading}
														fill={true}
														value={currentUser.name.first}
														onChange={(event: any) => {
															currentUser.name.first = event.target!.value;
															this.setState({
																currentUser: currentUser,
															});
														}}
													/>
												</Col>
											</Row>
											<Row gutter={[20, 16]}>
												<Col span={3}>
													<CenterMe>{Strings.LAST_NAME}:</CenterMe>
												</Col>
												<Col>
													<InputGroup
														placeholder={Strings.ENTER_LAST_NAME}
														disabled={loading}
														fill={true}
														value={currentUser.name.last}
														onChange={(event: any) => {
															currentUser.name.last = event.target!.value;
															this.setState({
																currentUser: currentUser,
															});
														}}
													/>
												</Col>
											</Row>
										</Col>
									</Row>
									<Row gutter={[6, 24]}>
										<Col span={3}>
											<CenterMe>{Strings.USERNAME}:</CenterMe>
										</Col>
										<Col span={16}>
											<InputGroup
												placeholder={Strings.ENTER_USERNAME}
												disabled={loading}
												fill={true}
												value={currentUser.username}
												onChange={(event: any) => {
													currentUser.username = event.target!.value;
													this.setState({
														currentUser: currentUser,
													});
												}}
											/>
										</Col>
									</Row>
									<Row gutter={[6, 24]}>
										<Col span={3}>
											<CenterMe>{Strings.EMAIL}:</CenterMe>
										</Col>
										<Col span={16}>
											<InputGroup
												placeholder={Strings.ENTER_EMAIL}
												disabled={loading}
												fill={true}
												value={currentUser.email}
												onChange={(event: any) => {
													currentUser.email = event.target!.value;
													this.setState({
														currentUser: currentUser,
													});
												}}
											/>
										</Col>
									</Row>
								</>
							</>
						) : (
							<>
								<Row>
									<Col span={10}>
										<H3 style={{ marginBottom: '20px' }}>{Strings.ADD_USER}</H3>
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
									{loading ? (
										<Center style={{ zIndex: 1 }}>
											<Spinner />
										</Center>
									) : null}
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
											name={Strings.ID}
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
								disabled={loading}
								onClick={() => this.closeOverlay()}
								style={{ margin: '' }}
							>
								{Strings.CLOSE}
							</Button>
							<Button
								disabled={loading}
								intent={Intent.PRIMARY}
								style={{ margin: '' }}
								onClick={() =>
									currentUser ? this.editUser() : this.createAllUsers()
								}
							>
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
							<H3>{Strings.SEARCH_USER}</H3>
							<div style={{ marginTop: '5%' }}>
								<Row gutter={[20, 20]}>
									<Col span={2}>{Strings.ID}:</Col>
									<Col span={16}>
										<InputGroup
											placeholder={Strings.ENTER_ID_TO_SEARCH}
											disabled={loading}
											value={searchID}
											onChange={(event: any) => {
												this.setState({
													searchID: event.target!.value,
												});
											}}
										/>
									</Col>
								</Row>
								<Row gutter={[6, 20]}>
									<Col span={2} offset={5}>
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
									text={Strings.ADD_NEW_USERS}
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
								text={Strings.DELETE_ALL_USERS}
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
						<>
							<Table
								bordered
								size="small"
								dataSource={data}
								scroll={{ x: true, y: 320 }}
								pagination={false}
								style={{ marginBottom: 20 }}
							>
								<Column title={Strings.ID} dataIndex="id" key="id" align="center" />
								<ColumnGroup title={Strings.NAME}>
									<Column
										title={Strings.FIRST_NAME}
										dataIndex="name.first"
										key="name.first"
										align="center"
										render={(text, record: User) => record.name.first}
									/>
									<Column
										title={Strings.LAST_NAME}
										dataIndex="name.last"
										key="name.last"
										align="center"
										render={(text, record: User) => record.name.last}
									/>
								</ColumnGroup>
								<Column
									title={Strings.USERNAME}
									dataIndex="username"
									key="username"
									align="center"
								/>
								<Column
									title={Strings.EMAIL}
									dataIndex="email"
									key="email"
									align="center"
								/>
								<Column
									align="center"
									title={Strings.ACTIONS}
									key="action"
									render={(text, record: User) => (
										<Space size="middle">
											<Button
												text={Strings.EDIT}
												intent={Intent.WARNING}
												onClick={() => this.edit(record)}
											/>
											<Button
												text={Strings.DELETE}
												intent={Intent.DANGER}
												onClick={() => this.delete(record.id)}
											/>
										</Space>
									)}
								/>
							</Table>
						</>
					)}
				</FillAllPage>
			</>
		);
	}
}
