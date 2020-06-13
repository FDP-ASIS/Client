import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Api } from './config/api';
import { Credentials, User } from '../models/user';

interface UserWithToken {
	user: User;
	token: string;
}

export class UserApi extends Api {
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

		this.login = this.login.bind(this);
		this.userRegister = this.userRegister.bind(this);
		this.getAllUsers = this.getAllUsers.bind(this);
		this.getById = this.getById.bind(this);
	}

	public login<R = UserWithToken>(credentials: Credentials): Promise<R> {
		return this.post<R, Credentials>('auth/login', credentials).then(this.success);
	}

	public userRegister(user: User): Promise<number> {
		return this.post<number, User>('https://www.domain.com/register', user)
			.then(this.success)
			.catch((error: AxiosError<Error>) => {
				throw error;
			});
	}

	public async getAllUsers(): Promise<User[]> {
		try {
			const res: AxiosResponse<User[]> = await this.get<User, AxiosResponse<User[]>>(
				'https://www.domain.com/register'
			);

			return this.success(res);
		} catch (error) {
			throw error;
		}
	}

	public getById(id: number): Promise<User> {
		return this.get<User, AxiosResponse<User>>(`https://www.domain.com/users/${id}`).then(
			this.success
		);
	}
}

export const userApi = new UserApi();
