import * as React from 'react';
import { User } from '../../models/user';
import { Course } from '../../models/course';
import { courseApi } from '../../api/course';
import Strings from '../../utils/strings';
import {
	H2,
	Button,
	Intent,
	Spinner,
	Toaster,
	IconName,
	Overlay,
	Classes,
	H3,
	H5,
} from '@blueprintjs/core';
import { Row, Col, Table } from 'antd';
import styled from 'styled-components';
import { installSoftware, getNeedToInstallSoftware } from '../../utils/software';
import classNames from 'classnames';
import { Software } from '../../models/software';
const { Column } = Table;

export interface Props {
	user: User;
}

export interface State {
	myCourses: Course[];
	user: User;
	loading: boolean;
	needToConfirm: boolean;
	needToInstall: Software[];
	needToRemove: Software[];
}

const Center = styled(H2)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	margin: auto;
	flex-grow: 1;
	text-align: center;
`;

const OVERLAY_CLASS = 'overlay-transition';

export default class MyCoursesStudent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			myCourses: [],
			user: props.user,
			loading: false,
			needToConfirm: false,
			needToInstall: [],
			needToRemove: [],
		};
	}

	private toaster: Toaster | undefined;

	private addToast = (reason: string, color: Intent, icon: IconName) => {
		if (this.toaster) this.toaster.show({ message: reason, intent: color, icon: icon });
	};

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

	removeCourse = (course: Course) => {
		this.setState({ loading: true });
		courseApi
			.removeStudentFromCourse(course.code, this.state.user.id)
			.then(() => {
				const myCourses = this.state.myCourses.filter((c) => c.code !== course.code);
				this.setState({
					myCourses: myCourses,
				});
				// deletionSoftware(myCourses, course);
				this.addToast(Strings.REMOVED, Intent.SUCCESS, 'thumbs-up');
			})
			.finally(() => {
				this.setState({ loading: false });
			});
	};

	installOrUpdate = () => {
		getNeedToInstallSoftware(this.state.myCourses).then((s) => {
			if (s.needToInstallSoftware.length === 0 && s.needToRemoveSoftware.length === 0) {
				this.addToast(Strings.NOTHING_TO_INSTALL_OR_REMOVE, Intent.PRIMARY, 'clean');
			} else
				this.setState({
					needToInstall: s.needToInstallSoftware,
					needToRemove: s.needToRemoveSoftware,
					needToConfirm: true,
				});
		});
	};
	private softwareTimeout: number | undefined;

	confirmInstallOrUpdate = () => {
		this.setState({
			loading: true,
		});
		installSoftware(this.state.myCourses);

		this.softwareTimeout = setTimeout(() => {
			this.setState({
				loading: false,
				needToConfirm: false,
			});
		}, 3000);
	};

	componentWillUnmount() {
		clearTimeout(this.softwareTimeout);
	}

	render() {
		const { myCourses, loading, needToConfirm, needToInstall, needToRemove } = this.state;
		const classes = classNames(Classes.CARD, Classes.ELEVATION_4, OVERLAY_CLASS);

		return (
			<>
				<Toaster
					position="top"
					canEscapeKeyClear={true}
					maxToasts={1}
					ref={(ref: Toaster) => (this.toaster = ref)}
				/>
				<Overlay isOpen={needToConfirm} usePortal>
					<div className={classes} style={{ color: 'black' }}>
						{needToInstall.length !== 0 ? (
							<>
								<Row gutter={[20, 6]}>
									<Col>
										<H3>{Strings.SOFTWARE_NEED_TO_INSTALL}</H3>
									</Col>
								</Row>
								{needToInstall.map((s) => {
									return (
										<Row>
											<Col span={12}>
												<H5>
													{Strings.NAME}: {s.name}
												</H5>
											</Col>
											<Col span={12}>
												<H5>
													{Strings.VERSION}: {s.version}
												</H5>
											</Col>
										</Row>
									);
								})}
							</>
						) : null}
						{needToRemove.length !== 0 ? (
							<>
								<Row gutter={[20, 6]} style={{ marginTop: '20px' }}>
									<Col>
										<H3>{Strings.SOFTWARE_NEED_TO_REMOVE}</H3>
									</Col>
								</Row>
								{needToRemove.map((s) => {
									return (
										<Row>
											<Col span={12}>
												<H5>
													{Strings.NAME}: {s.name}
												</H5>
											</Col>
											<Col span={12}>
												<H5>
													{Strings.VERSION}: {s.version}
												</H5>
											</Col>
										</Row>
									);
								})}
							</>
						) : null}

						<div
							className={Classes.DIALOG_FOOTER_ACTIONS}
							style={{ marginTop: '20px' }}
						>
							<Button
								intent={Intent.DANGER}
								disabled={loading}
								onClick={() => {
									this.setState({
										needToConfirm: false,
									});
								}}
								text={Strings.CLOSE}
							/>
							<Button
								intent={Intent.PRIMARY}
								disabled={loading}
								onClick={this.confirmInstallOrUpdate}
								text={Strings.OK}
							/>
						</div>
					</div>
				</Overlay>
				<Row gutter={[20, 6]}>
					<Col span={14}>
						<H2>{Strings.MY_COURSES}</H2>
					</Col>

					<Col span={10}>
						<Button
							large
							fill
							loading={loading}
							intent={Intent.PRIMARY}
							text={Strings.INSTALL_OR_UPDATE_SOFTWARE}
							onClick={this.installOrUpdate}
						/>
					</Col>
				</Row>
				{loading ? (
					<Center>
						<Spinner />
					</Center>
				) : (
					<Table
						bordered
						size="middle"
						dataSource={myCourses}
						scroll={{ x: true, y: 700 }}
						style={{ marginTop: 40 }}
					>
						<Column title={Strings.NAME} dataIndex="name" key="name" align="center" />
						<Column title={Strings.CODE} dataIndex="code" key="code" align="center" />
						<Column
							align="center"
							title={Strings.ACTIONS}
							key="action"
							render={(text, record: Course) => (
								<Button
									text={Strings.REMOVE}
									disabled={loading}
									intent={Intent.DANGER}
									onClick={() => this.removeCourse(record)}
								/>
							)}
						/>
					</Table>
				)}
			</>
		);
	}
}
