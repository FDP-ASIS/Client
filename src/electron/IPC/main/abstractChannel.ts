import { IpcChannelInterface } from './IpcChannelInterface';
import { IpcMainEvent } from 'electron';
import { IpcRequest } from '../../shared/IpcRequest';

export abstract class AbstractChannel<T = {}> implements IpcChannelInterface<T> {
	abstract getName(): string;

	handle(event: IpcMainEvent, request: IpcRequest<T>): void {
		if (!request.responseChannel) {
			request.responseChannel = `${this.getName()}_response`;
		}
		this.handleRequest(event, request);
	}

	protected abstract handleRequest(event: IpcMainEvent, request: IpcRequest<T>): void;
}
