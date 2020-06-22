import csv from 'csv-parser';
import fs from 'fs';
import { Department } from '../../models/department';

export const readDepartmentCSV = async (path: string): Promise<Department[]> => {
	let inputStream = fs.createReadStream(path, 'utf8');
	return new Promise(async (resolve, reject) => {
		const results: Department[] = [];
		await inputStream
			.pipe(csv())
			.on('data', (data) => {
				results.push(data);
			})
			.on('end', () => {
				return resolve(results);
			})
			.on('error', (err) => {
				return reject();
			});
	});
};
