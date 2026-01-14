import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

// Create MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT): 3000,
});

if(!process.env.DB_NAME || !db?.database) {
	console.log("db=", db);
	console.log("[91mWARNING:[0m Check .env");
}

console.log("Using database " + process.env.DB_NAME);