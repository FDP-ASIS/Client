import { IpcService } from '../electron/IPC/renderer/ipcService';
import { SoftwareChannels } from '../electron/IPC/channels/software';
import { Course } from '../models/course';
import { softwareApi } from '../api/software';
import { ScriptType, Software } from '../models/software';

const ipc = new IpcService();

export const installSoftware = async (courses: Course[]) => {
	const mySoftware: Software[] = [];

	courses.forEach((c) =>
		c.software.forEach((s) => {
			if (mySoftware.findIndex((myS) => myS.id === s.id) === -1) {
				mySoftware.push(s);
			}
		})
	);

	mySoftware.forEach((s) => {
		softwareApi.getScript(s.name, s.version, ScriptType.INSTALLATION).then((url) => {
			ipc.send<{}, { url: string; id: string }>(SoftwareChannels.Installation, {
				params: { url, id: s.id },
			});
		});
	});
};

export const deletionSoftware = async (courses: Course) => {
	courses.software.forEach((s) => {
		softwareApi.getScript(s.name, s.version, ScriptType.DELETION).then((url) => {
			ipc.send<{}, { url: string; id: string }>(SoftwareChannels.Deletion, {
				params: { url, id: s.id },
			});
		});
	});
};
