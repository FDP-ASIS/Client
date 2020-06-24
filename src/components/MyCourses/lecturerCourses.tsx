import * as React from 'react';
import { User } from '../../models/user';
import { Course } from '../../models/course';

export interface Props {
	user: User;
}

export interface State {
	courses: Course[];
}

export default class MyCoursesLecturer extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			courses: [],
		};
	}

	render() {
		return <div>My Courses lec</div>;
	}
}
