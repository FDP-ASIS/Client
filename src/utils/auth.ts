import { IpcService } from '../electron/IPC/renderer/ipcService';
import { AuthChannels } from '../electron/IPC/channels/auth';

const ipc = new IpcService();

export const getAuthToken = async (): Promise<string> => {
	const { token } = await ipc.send<{ token: string }>(AuthChannels.GetAuthToken);
	if (token) return Promise.resolve(token);
	return Promise.reject('Token not found');
};

export const logMeIn = async (username: string, password: string): Promise<string> => {
	//TODO send auth request to server
	return new Promise((resolve, reject) => {
		resolve('TOKEN');
		// reject('SERVER ERROR');
	});
};

export const logMeInWithToken = async (token: string): Promise<string> => {
	//TODO send auth request with token to server
	return new Promise((resolve, reject) => {
		resolve('TOKEN');
		// reject('SERVER ERROR');
	});
};

export const setAuthToken = async (token: string): Promise<void> => {
	const { succeed } = await ipc.send<{ succeed: boolean }, { token: string }>(
		AuthChannels.SetAuthToken,
		{
			params: { token },
		}
	);
	if (succeed) return Promise.resolve();
	return Promise.reject();
};
