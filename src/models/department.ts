export class Department {
	private _name: string;
	private _code: number;

	constructor(name: string, code: number) {
		this.name = name;
		this.code = code;
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
}
