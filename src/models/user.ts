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
	private _id: String;
	private _name: Name;
	private _username: String;
	private _email: String;
	private _role: Role;

	constructor(id: String, name: Name, username: String, email: String, role: Role) {
		this.id = id;
		this.name = name;
		this.username = username;
		this.email = email;
		this.role = role;
	}

	/**
	 * Getter id
	 * @return {String}
	 */
	public get id(): String {
		return this._id;
	}

	/**
	 * Setter id
	 * @param {String} value
	 */
	public set id(value: String) {
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
	 * @return {String}
	 */
	public get username(): String {
		return this._username;
	}

	/**
	 * Setter username
	 * @param {String} value
	 */
	public set username(value: String) {
		this._username = value;
	}

	/**
	 * Getter email
	 * @return {String}
	 */
	public get email(): String {
		return this._email;
	}

	/**
	 * Setter email
	 * @param {String} value
	 */
	public set email(value: String) {
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
