import { Json } from './json';

export enum ScriptType {
	INSTALLATION = 'INSTALLATION',
	DELETION = 'DELETION',
}

export class Software extends Json {
	private _id: string;
	private _name: string;
	private _version: string;

	constructor(id?: string, name?: string, version?: string);
	constructor(id: string, name: string, version: string) {
		super();
		this.id = id;
		this.name = name;
		this.version = version;
	}

	/**
	 * Getter id
	 * @return {string}
	 */
	public get id(): string {
		return this._id;
	}

	/**
	 * Getter name
	 * @return {string}
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * Getter version
	 * @return {string}
	 */
	public get version(): string {
		return this._version;
	}

	/**
	 * Setter id
	 * @param {string} value
	 */
	public set id(value: string) {
		this._id = value;
	}

	/**
	 * Setter name
	 * @param {string} value
	 */
	public set name(value: string) {
		this._name = value;
	}

	/**
	 * Setter version
	 * @param {string} value
	 */
	public set version(value: string) {
		this._version = value;
	}
}
