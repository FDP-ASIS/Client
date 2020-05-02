import { app, BrowserWindow } from "electron";
import path from "path";
import isDev from "electron-is-dev";

let mainWindow: BrowserWindow | null = null;

if (isDev) {
	const debug = require("electron-debug");
	debug({ devToolsMode: "detach" });
}

function createWindow() {
	let width = 900,
		height = 680;
	mainWindow = new BrowserWindow({
		minWidth: width,
		minHeight: height,
		webPreferences: {
			nodeIntegration: true,
		},
	});
	mainWindow.setMenuBarVisibility(false);
	mainWindow.loadURL(
		isDev
			? "http://localhost:3000"
			: `file://${path.join(__dirname, "../build/index.html")}`
	);

	if (isDev) {
		const {
			default: installExtension,
			REACT_DEVELOPER_TOOLS,
			REDUX_DEVTOOLS,
		} = require("electron-devtools-installer");

		app.whenReady().then(() => {
			installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
				.then((name: string) => {
					console.log(`Added Extension:  ${name}`);
				})
				.catch((err: string) => console.log("An error occurred: ", err));
		});

		// Open the DevTools.
		// BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
		// mainWindow.webContents.openDevTools();
	} else {
		const log = require("electron-log");
		console.log = log.log;
	}
	mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (isDev) require("devtron").install();

	if (mainWindow === null && BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
