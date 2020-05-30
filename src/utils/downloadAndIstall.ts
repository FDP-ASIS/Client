import { IpcService } from '../electron/IPC/renderer/ipcService';
import { SoftwareChannels } from '../electron/IPC/channels/software';

const ipc = new IpcService();

export const downloadAndInstall = async (): Promise<string> => {
	const { succeed } = await ipc.send<{ succeed: boolean }>(SoftwareChannels.DownloadAndInstall);
	if (succeed) return Promise.resolve('');
	return Promise.reject("Can't install");
};
