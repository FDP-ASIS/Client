import download from 'download';
import { spawn } from 'child_process';
import * as path from 'path';

export const downloadAndInstallSoftware = async (software: string) => {
	await download(
		'https://raw.githubusercontent.com/FDP-ASIS/Repository/master/scripts/Install_Eclipse.ps1',
		'downloadedSoftware'
	);
	let file = path.join(process.cwd(), 'downloadedSoftware', 'Install_Eclipse.ps1');
	console.log(file);
	let child = spawn('powershell.exe', ['-executionpolicy', 'bypass', '-file ', file]);
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

	return true;
};
