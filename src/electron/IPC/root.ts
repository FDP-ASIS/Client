import { IpcChannelInterface } from './main/IpcChannelInterface';

import {
	GetAuthTokenChannel,
	SetAuthTokenChannel,
	RemoveAuthTokenChannel,
} from './main/authChannel';

import { ReadDepartmentCSVChannel } from './main/readCSV';

interface ClassType<T> {
	new (...args: any[]): T;
}

const ipcsClasses: ClassType<any>[] = [
	GetAuthTokenChannel,
	SetAuthTokenChannel,
	RemoveAuthTokenChannel,
	ReadDepartmentCSVChannel,
];

const ipcs: IpcChannelInterface<any>[] = ipcsClasses.map((clazz) => new clazz());

export default ipcs;
