import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Api } from './config/api';
import { Credentials, User, Role } from '../models/user';

interface UserWithToken {
	user: User;
	token: string;
}

export class UserApi extends Api {
	private readonly BASE = 'user';
	private readonly BASE_AUTH = 'auth';
	private readonly ADMIN_BASE = `${this.BASE}/admin`;

	private readonly UPDATE_PASSWORD = `${this.BASE}/`; //{id}

	private readonly LOGIN = `${this.BASE_AUTH}/login`;
	private readonly LOGOUT = `${this.BASE_AUTH}/logout`;
	private readonly AUTH_WITH_TOKEN = this.BASE_AUTH;

	private readonly REGISTER_USERS = `${this.ADMIN_BASE}/register/`; //{role}
	private readonly GET_USERS = `${this.ADMIN_BASE}`;
	private readonly GET_USER = `${this.ADMIN_BASE}/`; //{id}
	private readonly DELETE_USERS = `${this.ADMIN_BASE}`;
	private readonly DELETE_ONE_USERS = `${this.ADMIN_BASE}/`; //{id}
	private readonly UPDATE_USER = `${this.ADMIN_BASE}/`; //{id}

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
		this.loginWithToken = this.loginWithToken.bind(this);
		this.logout = this.logout.bind(this);
		this.register = this.register.bind(this);
		this.getUsers = this.getUsers.bind(this);
		this.getUser = this.getUser.bind(this);
		this.deleteUsers = this.deleteUsers.bind(this);
		this.deleteUser = this.deleteUser.bind(this);
		this.updateUser = this.updateUser.bind(this);
		this.updatePassword = this.updatePassword.bind(this);

		// this.userRegister = this.userRegister.bind(this);
		// this.getAllUsers = this.getAllUsers.bind(this);
		// this.getById = this.getById.bind(this);
	}

	public login<R = UserWithToken>(credentials: Credentials): Promise<R> {
		return this.post<R, Credentials>(this.LOGIN, credentials);
	}

	public loginWithToken<R = User>(token: string): Promise<R> {
		return this.post<R, string>(this.AUTH_WITH_TOKEN, token);
	}

	public logout(): Promise<{}> {
		return this.delete(this.LOGOUT);
	}

	public register<R = User[]>(users: R, userRole: Role): Promise<R> {
		((users as unknown) as User[]).map(
			(user) => (user.name = JSON.parse(user.name.toJsonString()))
		);
		// ((users as unknown) as User[]).filter((user) => user);
		return this.post<R, R>(this.REGISTER_USERS + Role[userRole], users);
	}

	public getUsers<R = User[]>(page: number): Promise<R> {
		return this.get<R>(this.GET_USERS, { params: { page } });
	}

	public getUser<R = User>(id: string): Promise<R> {
		return this.get<R>(this.GET_USER + id);
	}

	public deleteUsers() {
		return this.delete(this.DELETE_USERS);
	}

	public deleteUser(id: string) {
		return this.delete(this.DELETE_ONE_USERS + id);
	}

	public updateUser(id: string, user: User) {
		user.name = JSON.parse(user.name.toJsonString());
		return this.put(this.UPDATE_USER + id, JSON.parse(user.toJsonString()));
	}

	public updatePassword(id: string, currentPassword: string, newPassword: string) {
		return this.patch(this.UPDATE_PASSWORD + id, {
			oldPassword: currentPassword,
			newPassword: newPassword,
		});
	}

	// public userRegister(user: User): Promise<number> {
	// 	return this.post<number, User>('https://www.domain.com/register', user)
	// 		.then(this.success)
	// 		.catch((error: AxiosError<Error>) => {
	// 			throw error;
	// 		});
	// }

	// public async getAllUsers(): Promise<User[]> {
	// 	try {
	// 		const res: AxiosResponse<User[]> = await this.get<User, AxiosResponse<User[]>>(
	// 			'https://www.domain.com/register'
	// 		);

	// 		return this.success(res);
	// 	} catch (error) {
	// 		throw error;
	// 	}
	// }

	// public getById(id: number): Promise<User> {
	// 	return this.get<User, AxiosResponse<User>>(`https://www.domain.com/users/${id}`).then(
	// 		this.success
	// 	);
	// }
}

export const userApi = new UserApi();
