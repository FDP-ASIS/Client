export interface Credentials {
	username: string;
	password: string;
}

export enum Role {
	STUDENT,
	LECTURER,
	ADMIN,
}

export interface Name {
	first: string;
	middle: string;
	last: string;
}

export class User {
	constructor(
		private id: number,
		private username: string,
		private name: Name,
		private email: string,
		private role: Role
	) {}
}
