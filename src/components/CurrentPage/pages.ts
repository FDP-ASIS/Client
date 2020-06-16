import { PrivateRouteProps } from '../../routers/private';
import { RoutesPath } from '../../routers/routesPath';
import { Role } from '../../models/user';

import MyCourses from '../MyCourses';
import EnrollToCourse from '../EnrollToCourse';
import Users from '../Users';
import Courses from '../Courses';
import Departments from '../Departments';
import Profile from '../Profile';
import AboutUs from '../AboutUs';

export interface pages extends PrivateRouteProps {
	path: RoutesPath;
}

export const dashRoutes: pages[] = [
	{
		path: RoutesPath.MyCourses,
		component: MyCourses,
		onlyRole: [Role.STUDENT, Role.LECTURER],
	},
	{
		path: RoutesPath.EnrollToCourse,
		component: EnrollToCourse,
		onlyRole: [Role.STUDENT],
	},
	{
		path: RoutesPath.MyCourses,
		component: Users,
		onlyRole: [Role.ADMIN],
	},
	{
		path: RoutesPath.Courses,
		component: Courses,
		onlyRole: [Role.ADMIN],
	},
	{
		path: RoutesPath.Users,
		component: Users,
		onlyRole: [Role.ADMIN],
	},
	{
		path: RoutesPath.Departments,
		component: Departments,
		onlyRole: [Role.ADMIN],
	},
	{
		path: RoutesPath.Profile,
		component: Profile,
	},
	{
		path: RoutesPath.AboutUs,
		component: AboutUs,
	},
];
