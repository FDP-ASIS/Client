import { IpcChannelInterface } from './main/IpcChannelInterface';

import { GetAuthTokenChannel } from './main/authChannel';

const ipcs: IpcChannelInterface[] = [];

ipcs.push(new GetAuthTokenChannel());

export default ipcs;
