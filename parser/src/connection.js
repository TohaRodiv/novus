import mysql from 'mysql2/promise';

export const connection = await mysql.createConnection({
	host: '172.19.0.8',
	user: 'user',
	password: '1234567D_p',
	database: 'novus'
});