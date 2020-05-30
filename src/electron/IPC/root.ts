import { IpcChannelInterface } from './main/IpcChannelInterface';

import { GetAuthTokenChannel, SetAuthTokenChannel } from './main/authChannel';
import { DownloadAndInstallChannel } from './main/downloadAndInstallChannel';

const ipcs: IpcChannelInterface<any>[] = [];

ipcs.push(new GetAuthTokenChannel());
ipcs.push(new SetAuthTokenChannel());
ipcs.push(new DownloadAndInstallChannel());

export default ipcs;
