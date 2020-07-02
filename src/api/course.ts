import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Api } from './config/api';
import { Course } from '../models/course';

export class CourseApi extends Api {
	private readonly BASE = '/course';
	private readonly ADMIN_BASE = `${this.BASE}/admin`;
	private readonly LECTURER_BASE = `${this.BASE}/lecturer`;

	private readonly CREATE = this.ADMIN_BASE;
	private readonly GET_COURSES = this.ADMIN_BASE;
	private readonly EDIT_COURSE = `${this.ADMIN_BASE}/`; //{code}
	private readonly DELETE_COURSE = `${this.ADMIN_BASE}/`; //{code}
	private readonly DELETE_ALL_COURSES = this.ADMIN_BASE;
	private readonly ASSIGN_LECTURER = `${this.ADMIN_BASE}/`; //{code}

	private readonly LECTURER_COURSES = `${this.LECTURER_BASE}/`; //{id}
	private readonly ADD_SOFTWARE = `${this.LECTURER_BASE}/`; //{id}
	private readonly REMOVE_SOFTWARE = `${this.LECTURER_BASE}/`; //{id}

	private readonly SEARCH_COURSE = `${this.BASE}/`;
	private readonly STUDENT_COURSES = `${this.BASE}/`; //{id}
	private readonly ENROLL = `${this.BASE}/`; //{code}

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

	public lecturerCourse<R = Course[]>(lecturerId: string): Promise<R | any[]> {
		return this.get<[]>(this.LECTURER_COURSES + lecturerId).then((obj) =>
			Object.keys(obj).flatMap((k) => obj[+k])
		);
	}

	public addSoftware(courseID: number, softwareID: string) {
		return this.patch(this.ADD_SOFTWARE + courseID, { id: softwareID });
	}

	public removeSoftware(courseID: number, softwareID: string) {
		return this.delete(this.REMOVE_SOFTWARE + courseID + '/' + softwareID);
	}

	public getCoursesUser<R = Course[]>(id: string): Promise<R | any[]> {
		return this.get<[]>(this.STUDENT_COURSES + id).then((obj) =>
			Object.keys(obj).flatMap((k) => obj[+k])
		);
	}

	public searchCoursesUser<R = Course[]>(name?: string, code?: number): Promise<R | any[]> {
		let filterType;
		let filterValue;
		if (name) {
			filterType = 'name';
			filterValue = name;
		} else {
			filterType = 'code';
			filterValue = code;
		}
		return this.get<[]>(this.SEARCH_COURSE, {
			params: {
				filterType,
				filterValue,
			},
		}).then((obj) => Object.keys(obj).flatMap((k) => obj[+k]));
	}

	public enroll(code: number, id: string) {
		return this.patch(this.ENROLL + code + '?id=' + id);
	}
}

export const courseApi = new CourseApi();
