import Strings from '../../utils/strings/index';
import { RoutesPath } from '../../routers/routesPath';
import { Role } from '../../models/user';
import { MenuTabProps } from './MenuTab';

const studentMenus: MenuTabProps[] = [
	{
		name: Strings.MY_COURSES,
		link: RoutesPath.MyCourses,
		icon: 'learning',
	},
	{
		name: Strings.ENROLL_TO_COURSE,
		link: RoutesPath.EnrollToCourse,
		icon: 'add',
	},
];

const lecturerMenus: MenuTabProps[] = [
	{
		name: Strings.MY_COURSES,
		link: RoutesPath.MyCourses,
		icon: 'learning',
	},
];

const adminMenus: MenuTabProps[] = [
	{
		name: Strings.USERS,
		link: RoutesPath.Users,
		icon: 'people',
	},
	{
		name: Strings.COURSES,
		link: RoutesPath.Courses,
		icon: 'learning',
	},
];

export const getMenu = (role: Role): MenuTabProps[] => {
	switch (role) {
		case Role.STUDENT:
			return studentMenus;
		case Role.LECTURER:
			return lecturerMenus;
		case Role.ADMIN:
			return adminMenus;
	}
};
