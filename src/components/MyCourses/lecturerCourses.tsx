import * as React from 'react';
import { User } from '../../models/user';
import { Course } from '../../models/course';
import { courseApi } from '../../api/course';
import styled from 'styled-components';
import Strings from '../../utils/strings';
import { H3, H5, Button, Intent, Overlay, Classes } from '@blueprintjs/core';
import { Table, Col, Row } from 'antd';
import Column from 'antd/lib/table/Column';
import classNames from 'classnames';
import { Software } from '../../models/software';

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
}

const CenterPage = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;
export default class MyCoursesLecturer extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			courses: [],
			loading: false,
			user: props.user,
			overlayIsOpen: false,
			addSoftware: [],
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
	}

	softwareOptions = (course: Course) => {
		const addSoftware: Software[] = this.state.addSoftware;
		for (let software of course.software)
			addSoftware.push(new Software(software.name, software.version));
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
		this.setState({
			overlayIsOpen: false,
		});
	};

	save = () => {};
	removeSoftware = (software: Software) => {
		const { addSoftware } = this.state;
		addSoftware.pop();
	};

	render() {
		const { courses, overlayIsOpen, currentCourse, loading, addSoftware } = this.state;
		const classes = classNames(Classes.CARD, Classes.ELEVATION_4, OVERLAY_CLASS);
		courses.map((course, i) => ((course as any)['key'] = i));
		addSoftware.map((software, i) => ((software as any)['key'] = i));
		const addSoftwareBind = [...addSoftware];
		return (
			<>
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
												return record.name;
											return 'aaaaaaa';
										}}
									/>
									<Column
										title={Strings.VERSION}
										dataIndex="version"
										key="version"
										align="center"
										render={(value: any, record: Software, index: number) => {
											if (index < currentCourse!.software.length)
												return record.version;
											return 'aaaaaaa';
										}}
									/>
									<Column
										align="center"
										title={Strings.ACTIONS}
										key="action"
										render={(text, record: Software) => (
											<Button
												text={Strings.DELETE}
												intent={Intent.DANGER}
												onClick={() => this.removeSoftware(record)}
											/>
										)}
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
									<Button
										disabled={loading}
										intent={Intent.PRIMARY}
										text={Strings.SAVE}
										onClick={this.save}
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
