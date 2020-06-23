import { IpcMainEvent } from 'electron';
import { AbstractChannel } from './abstractChannel';
import { IpcRequest } from '../../shared/IpcRequest';
import { ReadCSVChannels } from '../channels/readCSV';

import { readDepartmentCSV, readCourseCSV, readUserCSV } from '../../tools/readCSV';

export class ReadDepartmentCSVChannel extends AbstractChannel {
	getName(): string {
		return ReadCSVChannels.ReadDepartment;
	}

	async handleRequest(event: IpcMainEvent, request: IpcRequest<{ path: string }>): Promise<void> {
		event.sender.send(request.responseChannel!, {
			result: await readDepartmentCSV(request.params!.path),
		});
	}
}

export class ReadCourseCSVChannel extends AbstractChannel {
	getName(): string {
		return ReadCSVChannels.ReadCourse;
	}

	async handleRequest(event: IpcMainEvent, request: IpcRequest<{ path: string }>): Promise<void> {
		event.sender.send(request.responseChannel!, {
			result: await readCourseCSV(request.params!.path),
		});
	}
}

export class ReadUserCSVChannel extends AbstractChannel {
	getName(): string {
		return ReadCSVChannels.ReadUser;
	}

	async handleRequest(event: IpcMainEvent, request: IpcRequest<{ path: string }>): Promise<void> {
		event.sender.send(request.responseChannel!, {
			result: await readUserCSV(request.params!.path),
		});
	}
}
