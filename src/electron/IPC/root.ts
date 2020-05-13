import { IpcChannelInterface } from './main/IpcChannelInterface';

import { AuthChannel } from './main/AuthChannel';

const ipcs: IpcChannelInterface[] = [];

ipcs.push(new AuthChannel());

export default ipcs;
