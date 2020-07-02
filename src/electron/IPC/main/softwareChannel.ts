import { IpcMainEvent } from 'electron';
import { AbstractChannel } from './abstractChannel';
import { IpcRequest } from '../../shared/IpcRequest';
import { SoftwareChannels } from '../channels/software';

import { downloadAndRun } from '../../tools/software';

export class InstallSoftwareChannel extends AbstractChannel {
	getName(): string {
		return SoftwareChannels.Installation;
	}

	async handleRequest(
		event: IpcMainEvent,
		request: IpcRequest<{ url: string; id: string }> // : Promise<void>
	) {
		// event.sender.send(request.responseChannel!, {
		// 	result: await
		downloadAndRun(request.params!.url, request.params!.id);
		// ,});
	}
}

export class DeletionSoftwareChannel extends AbstractChannel {
	getName(): string {
		return SoftwareChannels.Deletion;
	}

	async handleRequest(
		event: IpcMainEvent,
		request: IpcRequest<{ url: string; id: string }> // :Promise<void>
	) {
		// event.sender.send(request.responseChannel!, {
		// 	result: await
		downloadAndRun(request.params!.url, request.params!.id);
		// ,});
	}
}
