export interface IpcRequest<P> {
	responseChannel?: string;
	params?: P;
}
