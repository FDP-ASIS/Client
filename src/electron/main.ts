import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';
import * as INSTALLER_EXTENSTION from 'electron-devtools-installer';
import { IpcChannelInterface } from './IPC/main/IpcChannelInterface';
import ipcs from './IPC/root';
import { sharedPreferences } from './store/store';

declare function require(moduleName: string): any;

if (isDev) {
	const debug = require('electron-debug');
	debug({ devToolsMode: 'detach' });
	require('electron-reload')(__dirname, {
		electron: path.join(__dirname, '..', '..', 'node_modules', '.bin', 'electron'),
		hardResetMethod: 'exit',
		forceHardReset: true,
	});
}

class Main {
	static readonly WIDTH = 900;
	static readonly HEIGHT = 680;

	private mainWindow: BrowserWindow | null = null;

	public init(ipcChannels: IpcChannelInterface<any>[]) {
		app.on('ready', this.createWindow);
		app.on('window-all-closed', this.onWindowAllClosed);
		app.on('activate', this.onActivate);
		this.registerIpcChannels(ipcChannels);
	}

	private onWindowAllClosed() {
		if (isDev) {
			sharedPreferences.clear();
		}
		if (process.platform !== 'darwin') {
			app.quit();
		}
	}

	private onActivate() {
		//add electron dev tool
		if (isDev) console.log(require('devtron').install());

		//make the mainWindow as a singleton
		if (!this.mainWindow && BrowserWindow.getAllWindows().length === 0) {
			this.createWindow();
		}
	}

	private createWindow() {
		this.mainWindow = new BrowserWindow({
			minWidth: Main.WIDTH,
			minHeight: Main.HEIGHT,
			maxWidth: Main.WIDTH,
			maxHeight: Main.HEIGHT,
			height: 600,
			width: 800,
			title: `Yet another Electron Application`,
			webPreferences: {
				nodeIntegration: true,
			},
		});
		this.mainWindow.setMenuBarVisibility(false);
		this.mainWindow.loadURL(
			isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../index.html')}`
		);
		if (isDev) {
			let installExtension: typeof INSTALLER_EXTENSTION = require('electron-devtools-installer');

			app.whenReady().then(() => {
				installExtension
					.default([
						installExtension.REACT_DEVELOPER_TOOLS,
						installExtension.REDUX_DEVTOOLS,
					])
					.then((name) => console.log(`Added Extension:  ${name}`))
					.catch((err) => console.log('An error occurred: ', err));
			});

			// Open the DevTools.
			// BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
			// this.mainWindow.webContents.openDevTools();
		} else {
			const log = require('electron-log');
			Object.assign(console, log.functions);
			// console.log = log.log;
		}
		this.mainWindow.on('closed', () => (this.mainWindow = null));
	}

	private registerIpcChannels(ipcChannels: IpcChannelInterface<any>[]) {
		ipcChannels.forEach((channel) =>
			ipcMain.on(channel.getName(), (event, request) => channel.handle(event, request))
		);
	}
}

new Main().init(ipcs);
