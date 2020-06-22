import { IpcService } from '../electron/IPC/renderer/ipcService';
import { ReadCSVChannels } from '../electron/IPC/channels/readCSV';
import { Department } from '../models/department';

const ipc = new IpcService();

export const readDepartmentCSV = async (path: string): Promise<Department[]> => {
	const { result } = await ipc.send<{ result: Department[] }, { path: string }>(
		ReadCSVChannels.ReadDepartment,
		{
			params: { path },
		}
	);
	if (result) return Promise.resolve(result);
	return Promise.reject();
};

// export const logMeOut = async (): Promise<{}> => {
// 	return userApi.logout().then(() => removeAuthToken());
// };

// export const getAuthToken = async (): Promise<string> => {
// 	const { token } = await ipc.send<{ token: string }>(AuthChannels.GetAuthToken);
// 	if (token) return Promise.resolve(token);
// 	return Promise.reject('Token not found');
// };

// export const logMeInWithToken = async (token: string): Promise<User> => {
// 	return userApi
// 		.loginWithToken(token)
// 		.then((user) => (user ? Promise.resolve(user) : Promise.reject()));
// };

// const setAuthToken = async (token: string): Promise<void> => {
// 	const { succeed } = await ipc.send<{ succeed: boolean }, { token: string }>(
// 		AuthChannels.SetAuthToken,
// 		{
// 			params: { token },
// 		}
// 	);
// 	if (succeed) return Promise.resolve();
// 	return Promise.reject();
// };

// const removeAuthToken = async (): Promise<{}> => {
// 	const { succeed } = await ipc.send<{ succeed: boolean }, { token: string }>(
// 		AuthChannels.RemoveAuthToken
// 	);
// 	if (succeed) return Promise.resolve({});
// 	return Promise.reject();
// };
