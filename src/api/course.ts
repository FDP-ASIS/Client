import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Api } from './config/api';
import { Course } from '../models/course';

export class CourseApi extends Api {
	private readonly BASE = '/course';
	private readonly ADMIN_BASE = `${this.BASE}/admin`;

	private readonly CREATE = this.ADMIN_BASE;
	private readonly GET_COURSES = this.ADMIN_BASE;
	private readonly EDIT_COURSE = `${this.ADMIN_BASE}/`; //{code}
	private readonly DELETE_COURSE = `${this.ADMIN_BASE}/`; //{code}
	private readonly DELETE_ALL_COURSES = this.ADMIN_BASE;
	private readonly ASSIGN_LECTURER = `${this.ADMIN_BASE}/`; //{code}

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
		this.getCourses = this.getCourses.bind(this);
		this.editCourse = this.editCourse.bind(this);
		this.deleteOne = this.deleteOne.bind(this);
		this.deleteAll = this.deleteAll.bind(this);
	}

	public create<R = {}>(courses: Course[]): Promise<R> {
		courses = courses.map((course) =>
			JSON.parse(new Course(course.name, course.code).toJsonString())
		);
		return this.post<R, Course[]>(this.CREATE, courses);
	}

	public getCourses<R = Course[]>(
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
		return this.get<[]>(this.GET_COURSES, {
			params: {
				page,
				filterType,
				filterValue,
			},
		}).then((obj) => Object.keys(obj).flatMap((k) => obj[+k]));
	}

	public editCourse(code: number, course: Course) {
		return this.put(this.EDIT_COURSE + code, JSON.parse(course.toJsonString()));
	}
	public deleteOne(code: number) {
		return this.delete(this.DELETE_COURSE + code);
	}
	public deleteAll() {
		return this.delete(this.DELETE_ALL_COURSES);
	}

	public assignLecturer<R = Course>(courseCode: number, lecturerId: string): Promise<R> {
		return this.patch(this.ASSIGN_LECTURER + courseCode + '/' + lecturerId);
	}

	public removeLecturer(courseCode: number, lecturerId: string) {
		return this.delete(this.ASSIGN_LECTURER + courseCode + '/' + lecturerId);
	}
}

export const courseApi = new CourseApi();
