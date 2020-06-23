import { IpcService } from '../electron/IPC/renderer/ipcService';
import { ReadCSVChannels } from '../electron/IPC/channels/readCSV';
import { Department } from '../models/department';
import { Course } from '../models/course';
import { User, Name } from '../models/user';

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

export const readCourseCSV = async (path: string): Promise<Course[]> => {
	const { result } = await ipc.send<{ result: Course[] }, { path: string }>(
		ReadCSVChannels.ReadCourse,
		{
			params: { path },
		}
	);
	if (result) return Promise.resolve(result);
	return Promise.reject();
};

export const readUserCSV = async (path: string): Promise<User[]> => {
	const { result } = await ipc.send<{ result: User[] }, { path: string }>(
		ReadCSVChannels.ReadUser,
		{
			params: { path },
		}
	);
	if (result) {
		result.map((r) => (r.name = new Name((r as any).first!, (r as any).last!)));
		return Promise.resolve(result);
	}
	return Promise.reject();
};
