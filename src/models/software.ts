import { Json } from './json';

export class Software extends Json {
	private _name: string;
	private _version: string;

	constructor(name: string, version: string) {
		super();
		this.name = name;
		this.version = version;
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
