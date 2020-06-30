import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Api } from './config/api';
import { Software } from '../models/software';

export class SoftwareApi extends Api {
	private readonly BASE = 'software';

	private readonly GET_SOFTWARE_NAME = this.BASE;
	private readonly GET_SOFTWARE_VERSION = `${this.BASE}/`; //{name}

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

	public getSoftwareVersion<R = Software[]>(name: string): Promise<R> {
		return this.get<R>(this.GET_SOFTWARE_VERSION + name);
	}
}

export const softwareApi = new SoftwareApi();
