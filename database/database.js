import mysql from 'mysql2/promise'

export const database = await mysql.createConnection({
	host: process.env.DATABASE_HOST || 'localhost',
	user: process.env.DATABASE_USERNAME || 'root',
	password: process.env.DATABASE_PASSWORD || process.env.LOCAL_DB_PASSWORD,
	port: process.env.DATABASE_PORT,
	multipleStatements: false,
	database: 'linksave'
})