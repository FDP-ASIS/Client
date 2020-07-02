import download from 'download';
import { spawn } from 'child_process';
import * as path from 'path';

const SCRIPT_FOLDER = 'downloadedScript';
const SCRIPT_NAME = 'script.ps1';

export const downloadAndRun = async (url: string, id: string) => {
	await download(url, SCRIPT_FOLDER + '/' + id);

	const script = path.join(process.cwd(), SCRIPT_FOLDER, id, SCRIPT_NAME);

	let child = spawn('powershell.exe', ['-executionpolicy', 'bypass', '-file ', script]);
	child.stdout.on('data', function (data) {
		console.log('Powershell Data: ' + data);
	});
	child.stderr.on('data', function (data) {
		console.log('Powershell Errors: ' + data);
	});
	child.on('exit', function () {
		console.log('Powershell Script finished');
	});
	child.stdin.end();
};
