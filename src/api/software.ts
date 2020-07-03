import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Api } from './config/api';
import { Software, ScriptType } from '../models/software';
class ScriptClass {
	private _download_url: string;

	constructor(download_url: string) {
		this._download_url = download_url;
	}

	/**
	 * Getter download_url
	 * @return {string}
	 */
	public get download_url(): string {
		return this._download_url;
	}

	/**
	 * Setter download_url
	 * @param {string} value
	 */
	public set download_url(value: string) {
		this._download_url = value;
	}
}
export class SoftwareApi extends Api {
	private readonly BASE = 'software';

	private readonly GET_SOFTWARE_NAME = this.BASE;
	private readonly GET_SOFTWARE_VERSION = `${this.BASE}/`; //{name}
	private readonly GET_SOFTWARE = `${this.BASE}/id/`; //{id}

	private GET_SOFTWARE_SCRIPT = (name: string, version: string): string =>
		`${this.BASE}/${name}/${version}`;

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

		this.getSoftwareName = this.getSoftwareName.bind(this);
		this.getSoftwareVersion = this.getSoftwareVersion.bind(this);
		// this.getScript = this.getScript.bind(this);
	}

	public getSoftwareName<R = string[]>(): Promise<R | any[]> {
		return this.get<[]>(this.GET_SOFTWARE_NAME).then((obj) =>
			Object.keys(obj).flatMap((k) => obj[+k])
		);
	}

	public getSoftwareVersion<R = Software[]>(name: string): Promise<R | any[]> {
		return this.get<[]>(this.GET_SOFTWARE_VERSION + name).then((obj) =>
			Object.keys(obj).flatMap((k) => obj[+k])
		);
	}

	public getScript(name: string, version: string, type: ScriptType): Promise<string> {
		return this.get<any>(this.GET_SOFTWARE_SCRIPT(name, version), {
			params: {
				type: type,
			},
		}).then((s) => (s as ScriptClass).download_url);
	}

	public getSoftware<R = Software>(id: string): Promise<R> {
		return this.get<R>(this.GET_SOFTWARE + id);
	}
}

export const softwareApi = new SoftwareApi();
