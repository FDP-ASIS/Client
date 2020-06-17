import * as React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import { PrivateRoute } from '../../routers/private';
import { RoutesPath } from '../../routers/routesPath';
import { Role } from '../../models/user';
import { AddDepartment, DetailsDepartment, SearchDepartment } from '.';

const Departments: React.FunctionComponent<{}> = (props) => {
	const { path } = useRouteMatch();
	return (
		<Switch>
			<PrivateRoute
				path={`${path}/${RoutesPath.AddDepartments}`}
				component={AddDepartment}
				onlyRole={[Role.ADMIN]}
			/>
			<PrivateRoute
				path={`${path}/${RoutesPath.DetailsDepartment}`}
				component={DetailsDepartment}
				onlyRole={[Role.ADMIN]}
			/>
			<PrivateRoute path={path} component={SearchDepartment} onlyRole={[Role.ADMIN]} />
		</Switch>
	);
};

export default Departments;
