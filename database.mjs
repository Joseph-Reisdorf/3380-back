// This is intended to be a file containing the database connection
// It's a separate file because it's a separate concern from the server
// It's also a separate file because it's a separate concern from the routes

// This is a file that will be imported into the server file


import mysql from "mysql2";

var pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    port: 3306,
    password: "X9f3ph$q",
    database: "Online_Music_Library"
});


export default pool;

