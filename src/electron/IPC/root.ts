import { IpcChannelInterface } from './main/IpcChannelInterface';

import {
	GetAuthTokenChannel,
	SetAuthTokenChannel,
	RemoveAuthTokenChannel,
} from './main/authChannel';

import { ReadCourseCSVChannel, ReadUserCSVChannel } from './main/readCSV';
import {
	InstallSoftwareChannel,
	DeletionSoftwareChannel,
	GetInstalledSoftwareChannel,
} from './main/softwareChannel';

interface ClassType<T> {
	new (...args: any[]): T;
}

const ipcsClasses: ClassType<any>[] = [
	GetAuthTokenChannel,
	SetAuthTokenChannel,
	RemoveAuthTokenChannel,
	ReadCourseCSVChannel,
	ReadUserCSVChannel,
	InstallSoftwareChannel,
	DeletionSoftwareChannel,
	GetInstalledSoftwareChannel,
];

const ipcs: IpcChannelInterface<any>[] = ipcsClasses.map((clazz) => new clazz());

export default ipcs;
