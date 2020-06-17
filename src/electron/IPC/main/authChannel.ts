import { IpcMainEvent } from 'electron';
import { AbstractChannel } from './abstractChannel';
import { IpcRequest } from '../../shared/IpcRequest';
import { AuthChannels } from '../channels/auth';
import { getAuthTokenStore, setAuthTokenStore, removeAuthTokenStore } from '../../tools/auth';

export class GetAuthTokenChannel extends AbstractChannel {
	getName(): string {
		return AuthChannels.GetAuthToken;
	}

	handleRequest(event: IpcMainEvent, request: IpcRequest<{}>): void {
		event.sender.send(request.responseChannel!, { token: getAuthTokenStore() });
	}
}

export class SetAuthTokenChannel extends AbstractChannel {
	getName(): string {
		return AuthChannels.SetAuthToken;
	}

	handleRequest(event: IpcMainEvent, request: IpcRequest<{ token: string }>): void {
		event.sender.send(request.responseChannel!, {
			succeed: setAuthTokenStore(request.params!.token),
		});
	}
}

export class RemoveAuthTokenChannel extends AbstractChannel {
	getName(): string {
		return AuthChannels.RemoveAuthToken;
	}

	handleRequest(event: IpcMainEvent, request: IpcRequest<{ token: string }>): void {
		event.sender.send(request.responseChannel!, {
			succeed: removeAuthTokenStore(),
		});
	}
}
