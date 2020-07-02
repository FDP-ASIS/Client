import * as React from 'react';
import { User } from '../../models/user';
import { Course } from '../../models/course';
import { courseApi } from '../../api/course';
import Strings from '../../utils/strings';
import { H2, Button, Intent, Spinner, Toaster, IconName } from '@blueprintjs/core';
import { Row, Col, Table } from 'antd';
import styled from 'styled-components';
const { Column } = Table;

export interface Props {
	user: User;
}

export interface State {
	myCourses: Course[];
	user: User;
	loading: boolean;
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

export default class MyCoursesStudent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			myCourses: [],
			user: props.user,
			loading: false,
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
				this.setState({
					myCourses: this.state.myCourses.filter((c) => c.code !== course.code),
				});
				this.addToast(Strings.REMOVED, Intent.SUCCESS, 'thumbs-up');
			})
			.finally(() => {
				this.setState({ loading: false });
			});
	};

	installOrUpdate = () => {};

	render() {
		const { myCourses, loading } = this.state;
		return (
			<>
				<Toaster
					position="top"
					canEscapeKeyClear={true}
					maxToasts={1}
					ref={(ref: Toaster) => (this.toaster = ref)}
				/>
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
