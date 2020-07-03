import { IpcService } from '../electron/IPC/renderer/ipcService';
import { SoftwareChannels } from '../electron/IPC/channels/software';
import { Course } from '../models/course';
import { softwareApi } from '../api/software';
import { ScriptType, Software } from '../models/software';

const ipc = new IpcService();

export const installSoftware = async (courses: Course[]) => {
	const meedToInstallSoftware: Software[] = [];
	const needToRemoveSoftwareId: string[] = [];

	const { mySoftwareIds } = await ipc.send<{ mySoftwareIds: string[] }, {}>(
		SoftwareChannels.GetInstalledSoftware
	);
	courses.forEach((c) =>
		c.software.forEach((s) => {
			if (meedToInstallSoftware.findIndex((myS) => myS.id === s.id) === -1) {
				meedToInstallSoftware.push(s);
			}
		})
	);

	mySoftwareIds.forEach((s) => {
		if (meedToInstallSoftware.findIndex((needToIns) => needToIns.id === s) === -1)
			needToRemoveSoftwareId.push(s);
	});

	needToRemoveSoftwareId.forEach((id) => {
		softwareApi.getSoftware(id).then((s) => {
			softwareApi.getScript(s.name, s.version, ScriptType.DELETION).then((url) => {
				ipc.send<{}, { url: string; id: string }>(SoftwareChannels.Deletion, {
					params: { url, id: s.id },
				});
			});
		});
	});

	meedToInstallSoftware.forEach((s) => {
		softwareApi.getScript(s.name, s.version, ScriptType.INSTALLATION).then((url) => {
			ipc.send<{}, { url: string; id: string }>(SoftwareChannels.Installation, {
				params: { url, id: s.id },
			});
		});
	});
};

export const deletionSoftware = async (myCourses: Course[], courses: Course) => {
	const mySoftware: Software[] = [];

	myCourses.forEach((c) =>
		c.software.forEach((s) => {
			if (mySoftware.findIndex((myS) => myS.id === s.id) === -1) {
				mySoftware.push(s);
			}
		})
	);

	courses.software.forEach((s) => {
		if (mySoftware.findIndex((myS) => myS.id === s.id))
			softwareApi.getScript(s.name, s.version, ScriptType.DELETION).then((url) => {
				ipc.send<{}, { url: string; id: string }>(SoftwareChannels.Deletion, {
					params: { url, id: s.id },
				});
			});
	});
};
