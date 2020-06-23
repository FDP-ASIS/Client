export interface Credentials {
	username: string;
	password: string;
}

export enum Role {
	STUDENT = 'STUDENT',
	LECTURER = 'LECTURER',
	ADMIN = 'ADMIN',
}

export class Name {
	private _first: string;
	private _middle: string;
	private _last: string;

	constructor(first: string, middle: string, last: string) {
		this.first = first;
		this.middle = middle;
		this.last = last;
	}

	/**
	 * Getter first
	 * @return {string}
	 */
	public get first(): string {
		return this._first;
	}

	/**
	 * Getter middle
	 * @return {string}
	 */
	public get middle(): string {
		return this._middle;
	}

	/**
	 * Getter last
	 * @return {string}
	 */
	public get last(): string {
		return this._last;
	}

	/**
	 * Setter first
	 * @param {string} value
	 */
	public set first(value: string) {
		this._first = value;
	}

	/**
	 * Setter middle
	 * @param {string} value
	 */
	public set middle(value: string) {
		this._middle = value;
	}

	/**
	 * Setter last
	 * @param {string} value
	 */
	public set last(value: string) {
		this._last = value;
	}
}

export class User {
	private _id: string;
	private _name: Name;
	private _username: string;
	private _email: string;
	private _role: Role;

	constructor(id: string, name: Name, username: string, email: string, role: Role) {
		this.id = id;
		this.name = name;
		this.username = username;
		this.email = email;
		this.role = role;
	}

	/**
	 * Getter id
	 * @return {string}
	 */
	public get id(): string {
		return this._id;
	}

	/**
	 * Setter id
	 * @param {string} value
	 */
	public set id(value: string) {
		this._id = value;
	}

	/**
	 * Getter name
	 * @return {Name}
	 */
	public get name(): Name {
		return this._name;
	}

	/**
	 * Setter name
	 * @param {Name} value
	 */
	public set name(value: Name) {
		this._name = value;
	}

	/**
	 * Getter username
	 * @return {string}
	 */
	public get username(): string {
		return this._username;
	}

	/**
	 * Setter username
	 * @param {string} value
	 */
	public set username(value: string) {
		this._username = value;
	}

	/**
	 * Getter email
	 * @return {string}
	 */
	public get email(): string {
		return this._email;
	}

	/**
	 * Setter email
	 * @param {string} value
	 */
	public set email(value: string) {
		this._email = value;
	}

	/**
	 * Getter role
	 * @return {Role}
	 */
	public get role(): Role {
		return this._role;
	}

	/**
	 * Setter role
	 * @param {Role} value
	 */
	public set role(value: Role) {
		this._role = value;
	}
}
