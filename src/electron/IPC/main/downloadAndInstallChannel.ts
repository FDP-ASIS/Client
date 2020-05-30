import { IpcMainEvent } from 'electron';
import { AbstractChannel } from './abstractChannel';
import { IpcRequest } from '../../shared/IpcRequest';
import { SoftwareChannels } from '../channels/software';
import { downloadAndInstallSoftware } from '../../tools/downloadAndInstall';

export class DownloadAndInstallChannel extends AbstractChannel {
	getName(): string {
		return SoftwareChannels.DownloadAndInstall;
	}

	handleRequest(event: IpcMainEvent, request: IpcRequest<{}>): void {
		downloadAndInstallSoftware('');
		event.sender.send(request.responseChannel!, {});
	}
}

// export class SetAuthTokenChannel extends AbstractChannel {
// 	getName(): string {
// 		return AuthChannels.SetAuthToken;
// 	}

// 	handleRequest(event: IpcMainEvent, request: IpcRequest<{ token: string }>): void {
// 		event.sender.send(request.responseChannel!, {
// 			succeed: setAuthTokenStore(request.params!.token),
// 		});
// 	}
// }
