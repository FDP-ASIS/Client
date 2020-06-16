import React, { FunctionComponent } from 'react';
import { Switch } from 'react-router-dom';
import { RoutesPath } from '../../routers/routesPath';
import { PrivateRoute } from '../../routers/private';
import { Role } from '../../models/user';

import MyCourses from '../MyCourses';
import EnrollToCourse from '../EnrollToCourse';
import Users from '../Users';
import Courses from '../Courses';
import AboutUs from '../AboutUs';
import Profile from '../Profile';
import Departments from '../Departments';

export const CurrentPage: FunctionComponent<{}> = () => {
	const addToCurrent = (toPath: RoutesPath) => RoutesPath.Dashboard + '/' + toPath;

	return (
		<Switch>
			<PrivateRoute
				path={addToCurrent(RoutesPath.MyCourses)}
				component={MyCourses}
				onlyRole={[Role.STUDENT, Role.LECTURER]}
			/>

			<PrivateRoute
				path={addToCurrent(RoutesPath.EnrollToCourse)}
				component={EnrollToCourse}
				onlyRole={[Role.STUDENT]}
			/>

			<PrivateRoute
				path={addToCurrent(RoutesPath.Users)}
				component={Users}
				onlyRole={[Role.ADMIN]}
			/>

			<PrivateRoute
				path={addToCurrent(RoutesPath.Courses)}
				component={Courses}
				onlyRole={[Role.ADMIN]}
			/>

			<PrivateRoute
				path={addToCurrent(RoutesPath.Departments)}
				component={Departments}
				onlyRole={[Role.ADMIN]}
			/>

			<PrivateRoute path={addToCurrent(RoutesPath.Profile)} component={Profile} />
			<PrivateRoute path={addToCurrent(RoutesPath.AboutUs)} component={AboutUs} />
		</Switch>
	);
};
