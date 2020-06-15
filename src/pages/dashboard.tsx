import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/reducers/user';
import { Role } from '../models/user';

export const Dashboard: FunctionComponent<{}> = () => {
	const user = useSelector(selectUser);
	switch (user?.role) {
		case Role.STUDENT:
			break;
		case Role.LECTURER:
			break;
		case Role.ADMIN:
			break;
	}
	return <div></div>;
};
