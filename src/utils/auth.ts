import { IpcService } from '../electron/IPC/renderer/ipcService';
import { AuthChannels } from '../electron/IPC/channels/auth';

const ipc = new IpcService();

export const getAuthToken = async (): Promise<string> => {
	const { token } = await ipc.send<{ token: string }>(AuthChannels.GetAuthToken);
	if (token) return Promise.resolve(token);
	return Promise.reject('Token not found');
};
