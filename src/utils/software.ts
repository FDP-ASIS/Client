import { IpcService } from '../electron/IPC/renderer/ipcService';
import { SoftwareChannels } from '../electron/IPC/channels/software';
import { Course } from '../models/course';
import { softwareApi } from '../api/software';
import { ScriptType, Software } from '../models/software';

const ipc = new IpcService();

class MySoftware {
	private _needToInstallSoftware: Software[];
	private _needToRemoveSoftware: Software[];

	constructor(needToInstallSoftware: Software[], needToRemoveSoftware: Software[]) {
		this.needToInstallSoftware = needToInstallSoftware;
		this.needToRemoveSoftware = needToRemoveSoftware;
	}

	/**
	 * Getter _needToInstallSoftware
	 * @return {Software[]}
	 */
	public get needToInstallSoftware(): Software[] {
		return this._needToInstallSoftware;
	}

	/**
	 * Getter _needToRemoveSoftware
	 * @return {Software[]}
	 */
	public get needToRemoveSoftware(): Software[] {
		return this._needToRemoveSoftware;
	}

	/**
	 * Setter _needToInstallSoftware
	 * @param {Software[]} value
	 */
	public set needToInstallSoftware(value: Software[]) {
		this._needToInstallSoftware = value;
	}

	/**
	 * Setter _needToRemoveSoftware
	 * @param {Software[]} value
	 */
	public set needToRemoveSoftware(value: Software[]) {
		this._needToRemoveSoftware = value;
	}
}

export const getNeedToInstallSoftware = async (currentCourses: Course[]): Promise<MySoftware> => {
	const needToInstallSoftware: Software[] = [];
	const needToRemoveSoftware: Software[] = [];
	const needToRemoveSoftwareId: string[] = [];

	const { mySoftwareIds } = await ipc.send<{ mySoftwareIds: string[] }, {}>(
		SoftwareChannels.GetInstalledSoftware
	);

	currentCourses.forEach((c) =>
		c.software.forEach((s) => {
			if (needToInstallSoftware.findIndex((myS) => myS.id === s.id) === -1) {
				needToInstallSoftware.push(s);
			}
		})
	);

	mySoftwareIds.forEach((s) => {
		const needToInstallSoftwareIndex = needToInstallSoftware.findIndex(
			(needToIns) => needToIns.id === s
		);
		if (needToInstallSoftwareIndex >= 0)
			needToInstallSoftware.slice(needToInstallSoftwareIndex, 1);
		else needToRemoveSoftwareId.push(s);
	});

	for (let id of needToRemoveSoftwareId) {
		const s = await softwareApi.getSoftware(id);
		needToRemoveSoftware.push(s);
	}
	return new MySoftware(needToInstallSoftware, needToRemoveSoftware);
};

export const installSoftware = async (courses: Course[]) => {
	const needToInstallSoftware: Software[] = [];
	const needToRemoveSoftwareId: string[] = [];

	const { mySoftwareIds } = await ipc.send<{ mySoftwareIds: string[] }, {}>(
		SoftwareChannels.GetInstalledSoftware
	);

	courses.forEach((c) =>
		c.software.forEach((s) => {
			if (needToInstallSoftware.findIndex((myS) => myS.id === s.id) === -1) {
				needToInstallSoftware.push(s);
			}
		})
	);

	mySoftwareIds.forEach((s) => {
		if (needToInstallSoftware.findIndex((needToIns) => needToIns.id === s) === -1)
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

	needToInstallSoftware.forEach((s) => {
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
