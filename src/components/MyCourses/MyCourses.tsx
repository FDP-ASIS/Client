import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/reducers/user';
import { Role } from '../../models/user';
import MyCoursesStudent from './studentCourses';
import MyCoursesLecturer from './lecturerCourses';

const MyCourses: React.FunctionComponent<{}> = (props) => {
	const user = useSelector(selectUser);
	switch (user?.role) {
		case Role.STUDENT:
			return <MyCoursesStudent user={user} />;
		case Role.LECTURER:
			return <MyCoursesLecturer user={user} />;
	}
	return null;
};

export default MyCourses;
