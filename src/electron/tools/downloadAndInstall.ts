import download from 'download';
import { spawn } from 'child_process';
import * as path from 'path';

export const downloadAndInstallSoftware = async (software: string) => {
	await download(
		'https://raw.githubusercontent.com/FDP-ASIS/Repository/master/scripts/silent_jdk.config',
		'downloadedSoftware'
	);

	await download(
		'https://raw.githubusercontent.com/FDP-ASIS/Repository/master/scripts/Install_jdk8.ps1',
		'downloadedSoftware'
	);

	await download(
		'https://raw.githubusercontent.com/FDP-ASIS/Repository/master/scripts/Install_Eclipse.ps1',
		'downloadedSoftware'
	);

	let fileJava = path.join(process.cwd(), 'downloadedSoftware', 'Install_jdk8.ps1');
	let fileEclipse = path.join(process.cwd(), 'downloadedSoftware', 'Install_Eclipse.ps1');

	let child1 = spawn('powershell.exe', ['-executionpolicy', 'bypass', '-file ', fileJava]);
	child1.stdout.on('data', function (data) {
		console.log('Powershell Data: ' + data);
	});
	child1.stderr.on('data', function (data) {
		console.log('Powershell Errors: ' + data);
	});
	child1.on('exit', function () {
		console.log('Powershell Script finished');
	});
	child1.stdin.end();

	let child2 = spawn('powershell.exe', ['-executionpolicy', 'bypass', '-file ', fileEclipse]);
	child2.stdout.on('data', function (data) {
		console.log('Powershell Data: ' + data);
	});
	child2.stderr.on('data', function (data) {
		console.log('Powershell Errors: ' + data);
	});
	child2.on('exit', function () {
		console.log('Powershell Script finished');
	});
	child2.stdin.end();

	return true;
};
