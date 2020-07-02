import { IpcChannelInterface } from './main/IpcChannelInterface';

import {
	GetAuthTokenChannel,
	SetAuthTokenChannel,
	RemoveAuthTokenChannel,
} from './main/authChannel';

import { ReadDepartmentCSVChannel, ReadCourseCSVChannel, ReadUserCSVChannel } from './main/readCSV';
import { InstallSoftwareChannel, DeletionSoftwareChannel } from './main/softwareChannel';

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
	InstallSoftwareChannel,
	DeletionSoftwareChannel,
];

const ipcs: IpcChannelInterface<any>[] = ipcsClasses.map((clazz) => new clazz());

export default ipcs;
