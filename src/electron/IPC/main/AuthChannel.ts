import { IpcChannelInterface } from './IpcChannelInterface';
import { IpcMainEvent } from 'electron';
import { IpcRequest } from '../../shared/IpcRequest';
import { AuthChannels } from '../channels/auth';
import { getAuthTokenStore } from '../../tools/auth';

export class AuthChannel implements IpcChannelInterface {
	getName(): string {
		return AuthChannels.CheckAuthToken;
	}

	handle(event: IpcMainEvent, request: IpcRequest): void {
		if (!request.responseChannel) {
			request.responseChannel = `${this.getName()}_response`;
		}
		event.sender.send(request.responseChannel, { token: getAuthTokenStore() });
	}
}
