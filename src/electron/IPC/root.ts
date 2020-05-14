import { IpcChannelInterface } from './main/IpcChannelInterface';

import { GetAuthTokenChannel, SetAuthTokenChannel } from './main/authChannel';

const ipcs: IpcChannelInterface<any>[] = [];

ipcs.push(new GetAuthTokenChannel());
ipcs.push(new SetAuthTokenChannel());

export default ipcs;
