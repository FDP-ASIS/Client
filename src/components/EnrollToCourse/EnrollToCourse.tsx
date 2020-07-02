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
	Toaster,
	Checkbox,
} from '@blueprintjs/core';
import styled from 'styled-components';
import { Empty, Row, Col } from 'antd';

import { Element } from 'react-scroll';
import { Course } from '../../models/course';
import { courseApi } from '../../api/course';
import { IconName } from '@blueprintjs/core';
import { User } from '../../models/user';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/reducers/user';

export interface Props {
	user: User;
}

export interface Key {
	key?: number;
}

export interface State {
	loading: boolean;
	data: (Course & Key)[];
	addData: (Course & Key)[];
	myCourses: Course[];
	clicked: boolean;
	isOpenAlert: boolean;
	showAllSelected: boolean;
	searchName?: string | undefined;
	searchCode?: number | undefined;
	user: User;
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

const EnrollToCourseHelper: React.FunctionComponent<{}> = (props) => {
	const user = useSelector(selectUser);
	return <EnrollToCourse user={user!} />;
};

export default EnrollToCourseHelper;

class EnrollToCourse extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			loading: false,
			clicked: false,
			isOpenAlert: false,
			showAllSelected: false,
			data: [],
			myCourses: [],
			addData: [],
			user: props.user,
		};
	}

	componentDidMount() {
		this.setMeCourses();
	}

	private setMeCourses = () => {
		this.setState({ loading: true });
		courseApi
			.getCoursesUser(this.state.user.id)
			.then((myCourses) => {
				this.setState({
					myCourses,
				});
			})
			.finally(() => {
				this.setState({ loading: false });
			});
	};

	private toaster: Toaster | undefined;

	private addToast = (reason: string, color: Intent, icon: IconName) => {
		if (this.toaster) this.toaster.show({ message: reason, intent: color, icon: icon });
	};

	search = () => {
		const { searchName, searchCode } = this.state;
		this.setState({ loading: true, clicked: true, showAllSelected: false });
		courseApi
			.searchCoursesUser(searchName, searchCode)
			.then((result) => {
				this.setState({ data: result });
			})
			.catch(() => {
				this.setState({ data: [] });
			})
			.finally(() => this.setState({ loading: false }));
	};

	clear = () => {
		this.setState({ data: [], clicked: false, showAllSelected: false });
	};

	downloadAll = () => {
		this.state.addData.forEach((c) => {
			courseApi.enroll(c.code, this.state.user.id);
		});
		const newMyCourses = this.state.myCourses.concat(this.state.addData);
		this.setState({
			myCourses: newMyCourses,
		});
		this.addToast(Strings.ADDED, Intent.SUCCESS, 'thumbs-up');
		this.setState({
			isOpenAlert: false,
		});
	};

	handleEnabledChange = (index: number) => {
		const { data, addData } = this.state;
		const course = data[index];
		const foundCourse = addData.find((c) => c.code === data[index].code);

		if (foundCourse) {
			const foundCourseIndex = addData.indexOf(foundCourse);
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const _ = addData.splice(foundCourseIndex, 1);
		} else {
			addData.push(
				new Course(course.name, course.code, undefined, undefined, course.software)
			);
		}
		this.setState({ addData });
	};

	isChecked = (index: number): boolean => {
		const { data, addData } = this.state;
		const foundCourse = addData.find((course) => course.code === data[index].code);
		if (this.isDisable(index) || foundCourse) return true;
		return false;
	};

	isDisable = (index: number): boolean => {
		const { data, myCourses } = this.state;
		let foundCourse = myCourses.find((course) => course.code === data[index].code);
		if (foundCourse) return true;
		return false;
	};

	render() {
		const {
			loading,
			data,
			isOpenAlert,
			clicked,
			searchName,
			searchCode,
			showAllSelected,
			addData,
		} = this.state;

		data.map((record) => (record.key = record.code));
		addData.map((record) => (record.key = record.code));

		return (
			<>
				<Toaster
					position="top"
					canEscapeKeyClear={true}
					maxToasts={1}
					ref={(ref: Toaster) => (this.toaster = ref)}
				/>
				<Alert
					confirmButtonText={Strings.YES}
					cancelButtonText={Strings.CANCEL}
					intent={Intent.PRIMARY}
					canEscapeKeyCancel
					canOutsideClickCancel
					icon="add"
					isOpen={isOpenAlert}
					onConfirm={() => this.downloadAll()}
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
									intent={Intent.PRIMARY}
									alignText={Alignment.LEFT}
									rightIcon={'eye-open'}
									fill={true}
									disabled={loading}
									text={Strings.SHOW_ALL_SELECTED_COURSES}
									onClick={() =>
										this.setState({
											showAllSelected: true,
										})
									}
								/>
							</div>
							<Button
								intent={Intent.SUCCESS}
								rightIcon={'download'}
								alignText={Alignment.LEFT}
								fill={true}
								disabled={loading}
								text={Strings.ENROLL_TO_SELECTED_COURSES}
								onClick={() => {
									if (this.state.addData.length === 0) {
										this.addToast(
											Strings.NO_SELECTION,
											Intent.WARNING,
											'thumbs-down'
										);
										this.setState({
											isOpenAlert: false,
										});
									} else {
										this.setState({
											isOpenAlert: true,
										});
									}
								}}
							/>
						</Col>
					</Row>

					{loading ? (
						<Center>
							<Spinner />
						</Center>
					) : showAllSelected ? (
						addData.length === 0 ? (
							<Center>
								<Empty description={Strings.NO_RESULT_FOUND} />
							</Center>
						) : (
							<Element
								name="search"
								style={{
									flexGrow: 1,
									height: '1px',
									overflow: 'scroll',
								}}
							>
								{addData.map((course, i) => {
									return (
										<Checkbox
											large
											checked
											label={course.code + ' ' + course.name}
											onChange={() => {
												// eslint-disable-next-line @typescript-eslint/no-unused-vars
												const _ = addData.splice(i, 1);
												this.setState({
													addData,
												});
											}}
										/>
									);
								})}
							</Element>
						)
					) : data.length === 0 ? (
						clicked ? (
							<Center>
								<Empty description={Strings.NO_RESULT_FOUND} />
							</Center>
						) : null
					) : (
						<Element
							name="search"
							style={{
								flexGrow: 1,
								height: '1px',
								overflow: 'scroll',
							}}
						>
							{data.map((course, i) => {
								return (
									<Checkbox
										large
										disabled={this.isDisable(i)}
										checked={this.isChecked(i)}
										label={course.code + ' ' + course.name}
										onChange={() => this.handleEnabledChange(i)}
									/>
								);
							})}
						</Element>
					)}
				</FillAllPage>
			</>
		);
	}
}
