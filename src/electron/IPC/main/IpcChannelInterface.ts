import { IpcMainEvent } from 'electron';
import { IpcRequest } from '../../shared/IpcRequest';

export interface IpcChannelInterface<P> {
	getName(): string;

	handle(event: IpcMainEvent, request: IpcRequest<P>): void;
}
