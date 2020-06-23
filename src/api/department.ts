import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Api } from './config/api';
import { Department } from '../models/department';

export class DepartmentApi extends Api {
	private readonly BASE = '/course/department/admin';

	private readonly CREATE = this.BASE;
	private readonly GET_DEPARTMENTS = this.BASE;
	private readonly EDIT_DEPARTMENT = `${this.BASE}/`; //{code}
	private readonly DELETE_DEPARTMENT = `${this.BASE}/`; //{code}
	private readonly DELETE_ALL_DEPARTMENTS = this.BASE;

	public constructor(config?: AxiosRequestConfig) {
		super(config);

		// this middleware is been called right before the http request is made.
		this.api.interceptors.request.use((param: AxiosRequestConfig) => ({
			...param,
		}));

		// this middleware is been called right before the response is get it by the method that triggers the request
		this.api.interceptors.response.use((param: AxiosResponse) => ({
			...param,
		}));

		this.create = this.create.bind(this);
		this.getDepartments = this.getDepartments.bind(this);
		this.editDepartment = this.editDepartment.bind(this);
		this.deleteOne = this.deleteOne.bind(this);
		this.deleteAll = this.deleteAll.bind(this);
	}

	public create<R = {}>(departments: Department[]): Promise<R> {
		departments = departments.map((department) =>
			JSON.parse(new Department(department.name, department.code).toJsonString())
		);
		return this.post<R, Department[]>(this.CREATE, departments);
	}

	public getDepartments<R = Department[]>(
		page: number,
		name?: string,
		code?: number
	): Promise<R | any[]> {
		let filterType;
		let filterValue;
		if (name) {
			filterType = 'name';
			filterValue = name;
		} else {
			filterType = 'code';
			filterValue = code;
		}
		return this.get<[]>(this.GET_DEPARTMENTS, {
			params: {
				page,
				filterType,
				filterValue,
			},
		}).then((obj) => Object.keys(obj).flatMap((k) => obj[+k]));
	}

	public editDepartment(code: number, department: Department) {
		return this.put(this.EDIT_DEPARTMENT + code, JSON.parse(department.toJsonString()));
	}
	public deleteOne(code: number) {
		return this.delete(this.DELETE_DEPARTMENT + code);
	}
	public deleteAll() {
		return this.delete(this.DELETE_ALL_DEPARTMENTS);
	}
}

export const departmentApi = new DepartmentApi();
