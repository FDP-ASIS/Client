import { Credentials, User } from './../models/user';
import { IpcService } from '../electron/IPC/renderer/ipcService';
import { AuthChannels } from '../electron/IPC/channels/auth';
import { userApi } from '../api/user';

const ipc = new IpcService();

export const logMeIn = async (credentials: Credentials): Promise<User> => {
	return userApi.login(credentials).then((userToken) => {
		setAuthToken(userToken.token);
		return userToken.user;
	});
};

export const getAuthToken = async (): Promise<string> => {
	const { token } = await ipc.send<{ token: string }>(AuthChannels.GetAuthToken);
	if (token) return Promise.resolve(token);
	return Promise.reject('Token not found');
};

export const logMeInWithToken = async (token: string): Promise<string> => {
	//TODO send auth request with token to server
	return new Promise((resolve, reject) => {
		resolve('TOKEN');
		// reject('SERVER ERROR');
	});
};

const setAuthToken = async (token: string): Promise<void> => {
	const { succeed } = await ipc.send<{ succeed: boolean }, { token: string }>(
		AuthChannels.SetAuthToken,
		{
			params: { token },
		}
	);
	if (succeed) return Promise.resolve();
	return Promise.reject();
};
