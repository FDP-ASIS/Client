import csv from 'csv-parser';
import fs from 'fs';
import { Course } from '../../models/course';
import { User } from '../../models/user';

export const readCourseCSV = async (path: string): Promise<Course[]> => {
	let inputStream = fs.createReadStream(path, 'utf8');
	return new Promise(async (resolve, reject) => {
		const results: Course[] = [];
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

export const readUserCSV = async (path: string): Promise<User[]> => {
	let inputStream = fs.createReadStream(path, 'utf8');
	return new Promise(async (resolve, reject) => {
		const results: User[] = [];
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
