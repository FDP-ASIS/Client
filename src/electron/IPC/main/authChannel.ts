import { IpcMainEvent } from 'electron';
import { AbstractChannel } from './rootChannel';
import { IpcRequest } from '../../shared/IpcRequest';
import { AuthChannels } from '../channels/auth';
import { getAuthTokenStore, setAuthTokenStore } from '../../tools/auth';

export class GetAuthTokenChannel extends AbstractChannel {
	getName(): string {
		return AuthChannels.GetAuthToken;
	}

	handleRequest(event: IpcMainEvent, request: IpcRequest): void {
		event.sender.send(request.responseChannel!, { token: getAuthTokenStore() });
	}
}

export class SetAuthTokenChannel extends AbstractChannel {
	getName(): string {
		return AuthChannels.SetAuthToken;
	}

	handleRequest(event: IpcMainEvent, request: IpcRequest): void {
		// TODO add token
		event.sender.send(request.responseChannel!, {
			token: setAuthTokenStore('asdasdasdasdasd'),
		});
	}
}
