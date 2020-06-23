import { User } from './user';
import { Software } from './software';
import { Json } from './json';

export class Course extends Json {
	private _name: string;
	private _code: number;
	private _students: User[];
	private _lecturers: User[];
	private _software: Software[];

	constructor(
		name?: string,
		code?: number,
		students?: User[],
		lecturers?: User[],
		software?: Software[]
	);
	constructor(
		name: string,
		code: number,
		students: User[],
		lecturers: User[],
		software: Software[]
	) {
		super();
		this._name = name;
		this._code = code;
		this._students = students;
		this._lecturers = lecturers;
		this._software = software;
	}

	/**
	 * Getter name
	 * @return {string}
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * Getter code
	 * @return {number}
	 */
	public get code(): number {
		return this._code;
	}

	/**
	 * Getter students
	 * @return {User[]}
	 */
	public get students(): User[] {
		return this._students;
	}

	/**
	 * Getter lecturer
	 * @return {User[]}
	 */
	public get lecturers(): User[] {
		return this._lecturers;
	}

	/**
	 * Getter software
	 * @return {Software[]}
	 */
	public get software(): Software[] {
		return this._software;
	}

	/**
	 * Setter name
	 * @param {string} value
	 */
	public set name(value: string) {
		this._name = value;
	}

	/**
	 * Setter code
	 * @param {number} value
	 */
	public set code(value: number) {
		this._code = value;
	}

	/**
	 * Setter students
	 * @param {User[]} value
	 */
	public set students(value: User[]) {
		this._students = value;
	}

	/**
	 * Setter lecturer
	 * @param {User[]} value
	 */
	public set lecturers(value: User[]) {
		this._lecturers = value;
	}

	/**
	 * Setter software
	 * @param {Software[]} value
	 */
	public set software(value: Software[]) {
		this._software = value;
	}
}
