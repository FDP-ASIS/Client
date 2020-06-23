import { IpcChannelInterface } from './main/IpcChannelInterface';

import {
	GetAuthTokenChannel,
	SetAuthTokenChannel,
	RemoveAuthTokenChannel,
} from './main/authChannel';

import { ReadDepartmentCSVChannel, ReadCourseCSVChannel, ReadUserCSVChannel } from './main/readCSV';

interface ClassType<T> {
	new (...args: any[]): T;
}

const ipcsClasses: ClassType<any>[] = [
	GetAuthTokenChannel,
	SetAuthTokenChannel,
	RemoveAuthTokenChannel,
	ReadDepartmentCSVChannel,
	ReadCourseCSVChannel,
	ReadUserCSVChannel,
];

const ipcs: IpcChannelInterface<any>[] = ipcsClasses.map((clazz) => new clazz());

export default ipcs;
