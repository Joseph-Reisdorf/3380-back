// This is intended to be a file containing the database connection
// It's a separate file because it's a separate concern from the server
// It's also a separate file because it's a separate concern from the routes

// This is a file that will be imported into the server file
import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config({ path: "./.env.local" });

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PORT = process.env.DB_PORT;
const DB_PASSWORD = process.env.DB_PASSWORD;

console.log(DB_HOST, DB_USER, DB_PORT, DB_PASSWORD);
var pool = mysql.createPool({
    connectionLimit: 10,
    host: DB_HOST,
    user: DB_USER,
    port: parseInt(DB_PORT, 10),
    password: DB_PASSWORD,
    database: "Online_Music_Library"
});


export default pool;

