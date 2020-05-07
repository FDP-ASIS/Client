import { app, BrowserWindow } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';
import * as INSTALLER_EXTENSTION from 'electron-devtools-installer';

declare function require(moduleName: string): any;

let mainWindow: BrowserWindow | null = null;

if (isDev) {
	const debug = require('electron-debug');
	debug({ devToolsMode: 'detach' });
	require('electron-reload')(__dirname);
}

function createWindow() {
	let width = 900,
		height = 680;
	mainWindow = new BrowserWindow({
		minWidth: width,
		minHeight: height,
		maxWidth: width,
		maxHeight: height,
		webPreferences: {
			nodeIntegration: true,
		},
	});
	mainWindow.setMenuBarVisibility(false);
	mainWindow.loadURL(
		isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../index.html')}`
	);

	if (isDev) {
		let installExtension: typeof INSTALLER_EXTENSTION = require('electron-devtools-installer');

		app.whenReady().then(() => {
			installExtension
				.default([installExtension.REACT_DEVELOPER_TOOLS, installExtension.REDUX_DEVTOOLS])
				.then((name) => console.log(`Added Extension:  ${name}`))
				.catch((err) => console.log('An error occurred: ', err));
		});

		// Open the DevTools.
		// BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
		// mainWindow.webContents.openDevTools();
	} else {
		const log = require('electron-log');
		Object.assign(console, log.functions);
		// console.log = log.log;
	}
	mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	//add electron dev tool
	if (isDev) console.log(require('devtron').install());

	//make the mainWindow as a singleton
	if (mainWindow === null && BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
