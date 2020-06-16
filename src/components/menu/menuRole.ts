import Strings from '../../utils/strings/index';
import { RoutesPath } from '../../routers/routesPath';
import { Role } from '../../models/user';
import { MenuTabProps } from './MenuTab';

const studentMenus: MenuTabProps[] = [
	{
		name: Strings.MY_COURSES,
		link: RoutesPath.MyCourses,
	},
	{
		name: Strings.ASSIGN_TO_COURSE,
		link: RoutesPath.MyCourses,
	},
];

const lecturerMenus: MenuTabProps[] = [
	{
		name: Strings.MY_COURSES,
		link: RoutesPath.MyCourses,
	},
];

const adminMenus: MenuTabProps[] = [
	{
		name: Strings.USERS,
		link: RoutesPath.Users,
	},
	{
		name: Strings.COURSES,
		link: RoutesPath.Courses,
	},
	{
		name: Strings.DEPARTMENTS,
		link: RoutesPath.Departments,
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
