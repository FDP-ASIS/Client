import * as React from 'react';
import Strings from '../../utils/strings';
import {
	H4,
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

// import { Element } from 'react-scroll';
import { Course } from '../../models/course';
import { readCourseCSV } from '../../utils/readCSV';
import { CourseApi } from '../../api/course';
import { IconName } from '@blueprintjs/core';
import { User } from '../../models/user';

const { Column } = Table;

export interface Props {}
export interface Key {
	key?: number;
}

export interface State {
	loading: boolean;
	data: (Course & Key)[];
	addData: (Course & Key)[];
	clicked: boolean;
	currentPage: number;
	hasNextPage: boolean;
	isOpenAlert: boolean;
	delete: number | null;
	OverlayIsOpen: boolean;
	currentCourseCode?: number;
	currentCourse: null | Course;
	searchName?: string | undefined;
	searchCode?: number | undefined;
	assignLecturer: boolean;
	lecturerID?: string | undefined;
	addedLecturer?: boolean;
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

export default class CoursesUI extends React.Component<Props, State> {
	inputReference: React.RefObject<HTMLInputElement> = React.createRef();
	courseApi: CourseApi;

	constructor(props: Props) {
		super(props);
		this.courseApi = new CourseApi();
		this.state = {
			loading: false,
			clicked: false,
			currentPage: 0,
			hasNextPage: false,
			isOpenAlert: false,
			delete: null,
			OverlayIsOpen: false,
			currentCourse: null,
			assignLecturer: false,
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
			readCourseCSV(this.inputReference.current.files[0].path)
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

	createAllCourses = () => {
		if (this.state.addData.length) {
			this.setState({
				loading: true,
			});
			this.courseApi
				.create(this.state.addData)
				.then(() => {
					this.closeOverlay();
					this.addToast(Strings.CREATED, Intent.SUCCESS, 'thumbs-up');
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

	search = (currentPage?: number) => {
		if (!currentPage) currentPage = this.state.currentPage;

		const { searchName, searchCode } = this.state;
		this.setState({ loading: true, clicked: true });
		this.courseApi
			.getCourses(currentPage, searchName, searchCode)
			.then((result) => {
				this.setState({ data: result });
			})
			.then(() => this.courseApi.getCourses(currentPage! + 1, searchName, searchCode))
			.then((res) =>
				this.setState({
					hasNextPage: res.length > 0 && searchName !== undefined ? true : false,
				})
			)
			.finally(() => this.setState({ loading: false }));
	};

	clear = () => {
		this.setState({ data: [], clicked: false });
	};

	delete = (id: number | null = null) => {
		this.setState({
			isOpenAlert: true,
			delete: id,
		});
	};

	edit = (course: Course) => {
		this.setState({
			OverlayIsOpen: true,
			currentCourse: new Course(course.name, course.code),
			currentCourseCode: course.code,
		});
	};

	editCourse = () => {
		this.setState({
			loading: true,
		});
		this.courseApi
			.editCourse(this.state.currentCourseCode!, this.state.currentCourse!)
			.then(() => {
				this.closeOverlay();
				this.search();
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
		let deleteId = this.state.delete!;
		if (deleteId) this.courseApi.deleteOne(deleteId);
		else this.courseApi.deleteAll();
		this.setState({
			isOpenAlert: false,
			delete: null,
		});
		this.search();
	};

	closeOverlay = () => {
		if (this.state.addedLecturer) this.search();
		this.setState({
			OverlayIsOpen: false,
			currentCourse: null,
			addData: [] as Course[],
			assignLecturer: false,
			addedLecturer: false,
		});
	};

	changeAddRow = (value: string, rowIndex: number, columnIndex: number) => {
		let course = this.state.addData[rowIndex!];
		switch (columnIndex) {
			case 0:
				course.name = value;
				break;
			case 1:
				course.code = +value;
				break;
		}
		// this.forceUpdate();
	};

	cellRenderer = (rowIndex: number, columnIndex: number) => {
		if (this.state.addData.length) {
			let value: string | number | undefined;
			let course = this.state.addData[rowIndex];
			switch (columnIndex) {
				case 0:
					value = course.name;
					break;
				case 1:
					value = course.code;
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
		this.state.addData.push(new Course());
		this.setState({
			addData: this.state.addData,
		});
		this.search();
	};

	assignLecturer = (course: Course) => {
		this.setState({
			OverlayIsOpen: true,
			currentCourse: course,
			assignLecturer: true,
		});
	};

	assignLecturerConfirm = () => {
		const { currentCourse, lecturerID } = this.state;
		this.setState({ loading: true });
		this.courseApi
			.assignLecturer(currentCourse!.code, lecturerID!)
			.then((res) => {
				this.courseApi
					.getCourses(0, undefined, currentCourse!.code)
					.then((res) => {
						this.setState({
							addedLecturer: true,
							currentCourse: res[0],
							lecturerID: '',
						});
						this.addToast(Strings.ADDED, Intent.SUCCESS, 'thumbs-up');
					})
					.catch((error) => {
						console.log(error);
						this.addToast(Strings.CHECK_YOUR_INFO, Intent.WARNING, 'issue');
					});
			})
			.catch((error) => {
				console.log(error);
				this.addToast(Strings.CHECK_YOUR_INFO, Intent.WARNING, 'issue');
			})
			.finally(() => {
				this.setState({ loading: false });
			});
	};

	removeLecturer = (id: string) => {
		const { currentCourse } = this.state;
		this.setState({ loading: true });

		this.courseApi.removeLecturer(currentCourse!.code, id).then(() => {
			this.courseApi
				.getCourses(0, undefined, currentCourse!.code)
				.then((res) =>
					this.setState({
						addedLecturer: true,
						currentCourse: res[0],
					})
				)
				.finally(() => {
					this.setState({ loading: false });
				});
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
			currentCourse,
			addData,
			clicked,
			searchName,
			searchCode,
			assignLecturer,
			lecturerID,
		} = this.state;

		data.map((record) => (record.key = record.code));

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
						{currentCourse ? (
							assignLecturer ? (
								<>
									<H3 style={{ marginBottom: '20px' }}>
										{Strings.ASSIGN_LECTURER}
									</H3>
									<Row gutter={[20, 6]}>
										<Col span={2}>{Strings.NAME}:</Col>
										<Col span={8}>{currentCourse.name}</Col>
									</Row>
									<Row gutter={[20, 16]}>
										<Col span={2}>{Strings.CODE}:</Col>
										<Col span={8}>{currentCourse.code}</Col>
									</Row>
									<Row gutter={[20, 16]}>
										<Col span={8}>
											<H4>{Strings.ADD_LECTURER_BY_ID}: </H4>
										</Col>
										<Col span={8}>
											<InputGroup
												placeholder={Strings.LECTURER_ID}
												disabled={loading}
												value={lecturerID}
												onChange={(event: any) => {
													this.setState({
														lecturerID: event.target!.value,
													});
												}}
											/>
										</Col>
										<Col offset={1}>
											<Button
												intent={Intent.PRIMARY}
												disabled={loading}
												onClick={() => this.assignLecturerConfirm()}
												text={Strings.ADD}
											/>
										</Col>
									</Row>
									<Table
										bordered
										size="small"
										dataSource={currentCourse.lecturers}
										scroll={{ x: true, y: 320 }}
										style={{ marginBottom: 20 }}
									>
										<Column title={Strings.ID} dataIndex="id" key="id" />
										<Column
											title={Strings.USERNAME}
											dataIndex="username"
											key="username"
										/>
										<Column
											align="center"
											title={Strings.ACTIONS}
											key="action"
											render={(text, record: User) => (
												<Button
													text={Strings.DELETE}
													intent={Intent.DANGER}
													onClick={() => this.removeLecturer(record.id)}
												/>
											)}
										/>
									</Table>
								</>
							) : (
								<>
									<H3 style={{ marginBottom: '20px' }}>{Strings.EDIT_COURSE}</H3>
									<Row gutter={[20, 16]}>
										<Col span={3}>{Strings.NAME}:</Col>
										<Col span={16}>
											<InputGroup
												placeholder={Strings.ENTER_NAME_TO_SEARCH}
												disabled={loading}
												value={currentCourse.name}
												onChange={(event: any) => {
													currentCourse.name = event.target!.value;
													this.setState({
														currentCourse: currentCourse,
													});
												}}
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
												value={currentCourse.code}
												onValueChange={(value) => {
													currentCourse.code = value;
													this.setState({
														currentCourse: currentCourse,
													});
												}}
											/>
										</Col>
									</Row>
								</>
							)
						) : (
							<>
								<Row>
									<Col span={10}>
										<H3 style={{ marginBottom: '20px' }}>
											{Strings.ADD_COURSE}
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
								disabled={loading}
								onClick={() => this.closeOverlay()}
								style={{ margin: '' }}
								text={Strings.CLOSE}
							/>
							{assignLecturer ? null : (
								<Button
									disabled={loading}
									intent={Intent.PRIMARY}
									style={{ margin: '' }}
									text={Strings.SAVE}
									onClick={() =>
										currentCourse ? this.editCourse() : this.createAllCourses()
									}
								/>
							)}
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
							<H3>{Strings.SEARCH_COURSE}</H3>
							<div style={{ marginTop: '5%' }}>
								<Row gutter={[20, 16]}>
									<Col span={3}>{Strings.NAME}:</Col>
									<Col span={16}>
										<InputGroup
											placeholder={Strings.ENTER_NAME_TO_SEARCH}
											disabled={loading}
											value={searchName ? searchName : ''}
											onChange={(event: any) => {
												this.setState({
													searchName: event.target!.value,
													searchCode: undefined,
												});
											}}
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
											value={searchCode}
											onValueChange={(val) => {
												this.setState({
													searchCode: val,
													searchName: undefined,
												});
											}}
										/>
									</Col>
								</Row>
								<Row gutter={[6, 20]}>
									<Col span={2} offset={6}>
										<Button
											text={Strings.SEARCH}
											disabled={loading}
											intent={Intent.PRIMARY}
											onClick={() => this.search()}
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
						<Col span={7} offset={1}>
							<div style={{ marginBottom: '10%' }}>
								<Button
									intent={Intent.SUCCESS}
									alignText={Alignment.LEFT}
									rightIcon={'add'}
									fill={true}
									disabled={loading}
									text={Strings.ADD_NEW_COURSE}
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
								text={Strings.DELETE_ALL_COURSE}
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
									render={(text, record: Course) => (
										<Space size="middle">
											<Button
												text={Strings.ASSIGN_LECTURER}
												intent={Intent.PRIMARY}
												onClick={() => this.assignLecturer(record)}
											/>
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
										onClick={() => {
											this.setState({
												currentPage: this.state.currentPage - 1,
											});
											this.search(this.state.currentPage - 1);
										}}
									/>
								</Col>
								<Col>
									<CenterPage>{currentPage + 1}</CenterPage>
								</Col>
								<Col>
									<Button
										text={`${Strings.NEXT} >`}
										disabled={!hasNextPage}
										onClick={() => {
											this.setState({
												currentPage: this.state.currentPage + 1,
											});
											this.search(this.state.currentPage + 1);
										}}
									/>
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
