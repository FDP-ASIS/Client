import * as React from 'react';
import { Table, Col, Row } from 'antd';
import {
	H3,
	H5,
	Button,
	Intent,
	Overlay,
	Classes,
	Toaster,
	IconName,
	MenuItem,
} from '@blueprintjs/core';
import classNames from 'classnames';
import styled from 'styled-components';
import { User } from '../../models/user';
import { Course } from '../../models/course';
import { courseApi } from '../../api/course';
import Strings from '../../utils/strings';
import { Software } from '../../models/software';
import { Select } from '@blueprintjs/select';
import { softwareApi } from '../../api/software';
const { Column } = Table;
export interface Props {
	user: User;
}

const OVERLAY_CLASS = 'overlay-transition';

export interface State {
	courses: Course[];
	loading: boolean;
	user: User;
	currentCourse?: Course;
	overlayIsOpen: boolean;
	addSoftware: Software[];
	softwareNames: string[];
	version: Map<string, Software[]>;
}

const CenterPage = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const SoftwareSelect = Select.ofType<string>();

export default class MyCoursesLecturer extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			courses: [],
			loading: false,
			user: props.user,
			overlayIsOpen: false,
			addSoftware: [],
			softwareNames: [],
			version: new Map<string, Software[]>(),
		};
	}
	componentDidMount() {
		this.setState({
			loading: true,
		});
		courseApi.lecturerCourse(this.state.user.id).then((courses) => {
			this.setState({
				courses: courses,
				loading: false,
			});
		});
		this.getAllSoftwareName();
	}

	getAllSoftwareName = () => {
		softwareApi.getSoftwareName().then((softwareNamesToAdd) => {
			if (softwareNamesToAdd.length !== 0) {
				const { softwareNames } = this.state;
				softwareNames.push(...softwareNamesToAdd);
				this.setState({
					softwareNames: softwareNames,
				});
			}
		});
	};

	private toaster: Toaster | undefined;

	private addToast = (reason: string, color: Intent, icon: IconName) => {
		if (this.toaster) this.toaster.show({ message: reason, intent: color, icon: icon });
	};

	softwareOptions = (course: Course) => {
		const addSoftware: Software[] = this.state.addSoftware;
		for (let software of course.software)
			addSoftware.push(new Software(software.id, software.name, software.version));
		this.setState({
			currentCourse: course,
			overlayIsOpen: true,
			addSoftware: addSoftware,
		});
	};

	addNewRow = () => {
		const { addSoftware } = this.state;
		addSoftware.push(new Software());
		this.setState({
			addSoftware,
		});
	};

	closeOverlay = () => {
		courseApi.lecturerCourse(this.state.user.id).then((courses) => {
			this.setState({
				courses: courses,
				loading: false,
			});
		});
		this.setState({
			overlayIsOpen: false,
			addSoftware: [],
		});
	};

	save = (software: Software) => {
		if (!software.name || !software.version) {
			this.addToast(Strings.CHECK_YOUR_INFO, Intent.WARNING, 'issue');
			return;
		}
		this.setState({ loading: true });
		courseApi
			.addSoftware(this.state.currentCourse!.code, software.id)
			.then(() => {
				const { currentCourse, addSoftware } = this.state;
				currentCourse?.software.push(software);
				addSoftware.filter((s) => !s.id || s.id !== software.id);
				this.setState({
					currentCourse,
					addSoftware,
				});
				// this.forceUpdate()
				this.addToast(Strings.ADDED, Intent.SUCCESS, 'thumbs-up');
			})
			.catch(() => {
				this.addToast(Strings.CHECK_YOUR_INFO, Intent.DANGER, 'issue');
			})
			.finally(() => {
				this.setState({ loading: false });
			});
	};

	removeSoftware = (software: Software) => {
		this.setState({ loading: true });
		courseApi
			.removeSoftware(this.state.currentCourse!.code, software.id)
			.then(() => {
				const { currentCourse, addSoftware } = this.state;

				currentCourse!.software = currentCourse!.software.filter(
					(s) => s.id !== software.id
				);

				const addSoftwareNew = addSoftware.filter((s) => !s.id || s.id !== software.id);

				this.setState({
					currentCourse,
					addSoftware: addSoftwareNew,
				});

				this.addToast(Strings.REMOVED, Intent.SUCCESS, 'thumbs-up');
			})
			.catch(() => {
				this.addToast(Strings.CHECK_YOUR_INFO, Intent.DANGER, 'issue');
			})
			.finally(() => {
				this.setState({ loading: false });
			});
	};

	selectSoftware = (index: number, softwareName: string) => {
		const { version, addSoftware } = this.state;

		if (version.get(softwareName) === undefined) {
			this.setState({
				loading: true,
			});
			softwareApi
				.getSoftwareVersion(softwareName)
				.then((softwareWithVersions) => {
					const { version } = this.state;
					version.set(softwareName, softwareWithVersions);
					this.setState({
						version,
					});
				})
				.finally(() => {
					this.setState({
						loading: false,
					});
				});
		}
		const currentSoftware = addSoftware.find((_, i) => i === index);
		if (currentSoftware!.name !== softwareName) {
			currentSoftware!.version = '';
			currentSoftware!.name = softwareName;
			currentSoftware!.id = '';
		}
		this.forceUpdate();
	};

	getVersions = (index: number): string[] => {
		const name = this.state.addSoftware.find((_, i) => i === index)?.name;
		const allSoftwareOf = this.state.version.get(name!);
		const list: string[] = [];

		if (allSoftwareOf) allSoftwareOf.forEach((s) => list.push(s.version));

		return list;
	};

	selectSoftwareVersion = (index: number, softwareVersion: string) => {
		const currentSoftware = this.state.addSoftware.find((_, i) => i === index);
		currentSoftware!.version = softwareVersion;
		currentSoftware!.id = this.state.version
			.get(currentSoftware!.name)!
			.find((s) => s.version === softwareVersion)?.id!;

		this.forceUpdate();
	};

	render() {
		const {
			courses,
			overlayIsOpen,
			currentCourse,
			loading,
			addSoftware,
			softwareNames,
		} = this.state;
		const classes = classNames(Classes.CARD, Classes.ELEVATION_4, OVERLAY_CLASS);
		courses.map((course, i) => ((course as any)['key'] = i));
		addSoftware.map((software, i) => ((software as any)['key'] = i));
		const addSoftwareBind = [...addSoftware];
		return (
			<>
				<Toaster
					position="top"
					canEscapeKeyClear={true}
					maxToasts={1}
					ref={(ref: Toaster) => (this.toaster = ref)}
				/>
				{courses.length === 0 ? (
					<CenterPage>
						<H3>{Strings.NO_COURSE_FOUND}</H3>
					</CenterPage>
				) : (
					<>
						<Overlay isOpen={overlayIsOpen} usePortal>
							<div className={classes} style={{ color: 'black' }}>
								<Row gutter={[20, 6]}>
									<Col span={3}>
										<H5 style={{ margin: 0, textAlign: 'center' }}>
											{Strings.NAME}:
										</H5>
									</Col>
									<Col span={8}>{currentCourse?.name}</Col>
								</Row>
								<Row gutter={[20, 40]}>
									<Col span={3}>
										<H5 style={{ margin: 0, textAlign: 'center' }}>
											{Strings.CODE}:
										</H5>
									</Col>
									<Col span={8}>{currentCourse?.code}</Col>
								</Row>
								<Row gutter={[20, 6]}>
									<Col span={3}>
										<H5 style={{ margin: 0, textAlign: 'center' }}>
											{Strings.SOFTWARE}:
										</H5>
									</Col>
									<Col span={8} offset={13}>
										<Button
											fill={true}
											disabled={loading}
											text={Strings.ADD_NEW_SOFTWARE}
											intent={Intent.PRIMARY}
											onClick={this.addNewRow}
										/>
									</Col>
								</Row>
								<Table
									bordered
									size="small"
									pagination={{ position: ['bottomLeft', 'bottomLeft'] }}
									dataSource={addSoftwareBind}
									scroll={{ x: true, y: 260 }}
									style={{ marginTop: 10 }}
								>
									<Column
										title={Strings.NAME}
										dataIndex="name"
										key="name"
										align="center"
										render={(value: any, record: Software, index: number) => {
											if (index < currentCourse!.software.length)
												return currentCourse!.software[index].name;
											const currentSoftware = addSoftwareBind.find(
												(_, i) => i === index
											);
											return (
												<SoftwareSelect
													filterable={false}
													items={softwareNames}
													itemRenderer={(item, softwareNameIndex) => {
														return (
															<MenuItem
																text={item}
																active={
																	currentSoftware
																		? item ===
																		  currentSoftware.name
																		: false
																}
																onClick={() => {
																	this.selectSoftware(
																		index,
																		softwareNames.find(
																			(_, i) =>
																				i ===
																				softwareNameIndex.index
																		)!
																	);
																}}
															/>
														);
													}}
													noResults={
														<MenuItem
															disabled={true}
															text={Strings.NO_RESULT_FOUND}
														/>
													}
													onItemSelect={() => {}}
												>
													<Button
														rightIcon="caret-down"
														text={
															currentSoftware?.name
																? currentSoftware.name
																: Strings.SELECT
														}
														disabled={loading}
													/>
												</SoftwareSelect>
											);
										}}
									/>
									<Column
										title={Strings.VERSION}
										dataIndex="version"
										key="version"
										align="center"
										render={(value: any, record: Software, index: number) => {
											if (index < currentCourse!.software.length)
												return currentCourse!.software[index].version;

											const currentSoftware = addSoftwareBind.find(
												(_, i) => i === index
											);

											if (
												!currentSoftware ||
												currentSoftware.name === undefined ||
												currentSoftware.name === ''
											)
												return (
													<Button
														text={Strings.SELECT_SOFTWARE_FIRST}
														disabled={true}
													/>
												);

											return (
												<SoftwareSelect
													filterable={false}
													items={this.getVersions(index)!}
													itemRenderer={(item, softwareVersionIndex) => {
														return (
															<MenuItem
																text={item}
																active={
																	currentSoftware!.version ===
																	item
																}
																onClick={() => {
																	this.selectSoftwareVersion(
																		index,
																		item
																	);
																}}
															/>
														);
													}}
													noResults={
														<MenuItem
															disabled={true}
															text={Strings.NO_RESULT_FOUND}
														/>
													}
													onItemSelect={() => {}}
												>
													<Button
														rightIcon="caret-down"
														text={
															record.version === ''
																? Strings.SELECT
																: record.version
														}
														disabled={loading}
													/>
												</SoftwareSelect>
											);
										}}
									/>
									<Column
										align="center"
										title={Strings.ACTIONS}
										key="action"
										render={(text, record: Software, index: number) => {
											if (index < currentCourse!.software.length)
												return (
													<Button
														text={Strings.DELETE}
														disabled={loading}
														intent={Intent.DANGER}
														onClick={() => this.removeSoftware(record)}
													/>
												);
											else
												return (
													<Button
														text={Strings.ADD}
														disabled={loading}
														intent={Intent.PRIMARY}
														onClick={() => this.save(record)}
													/>
												);
										}}
									/>
								</Table>
								<div
									className={Classes.DIALOG_FOOTER_ACTIONS}
									style={{ marginTop: '20px' }}
								>
									<Button
										intent={Intent.DANGER}
										disabled={loading}
										onClick={this.closeOverlay}
										text={Strings.CLOSE}
									/>
								</div>
							</div>
						</Overlay>
						<H3>{Strings.MY_COURSES}</H3>
						<Table
							bordered
							size="small"
							dataSource={courses}
							scroll={{ x: true, y: 320 }}
							pagination={false}
							style={{ marginTop: 40 }}
						>
							<Column
								title={Strings.NAME}
								dataIndex="name"
								key="name"
								align="center"
							/>
							<Column
								title={Strings.CODE}
								dataIndex="code"
								key="code"
								align="center"
							/>
							<Column
								align="center"
								title={Strings.ACTIONS}
								key="action"
								render={(text, record: Course) => (
									<Button
										text={Strings.ADD_OR_REMOVE_SOFTWARE}
										disabled={loading}
										intent={Intent.PRIMARY}
										onClick={() => this.softwareOptions(record)}
									/>
								)}
							/>
						</Table>
					</>
				)}
			</>
		);
	}
}
