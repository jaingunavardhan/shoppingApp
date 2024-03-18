//Importing mysql2
const mysql = require('mysql2');

//Creating a Connection Pool so that we don't exhaust the connextion OR
// We don't have to create a new connection everytime we have read/write operations
const pool = mysql.createPool({
    host:"localhost",       //Hostname
    database:"node_db",     //Database name
    user:"root",            //Username
    password:"guna"         //Password
});

//Exporting this DB connection pool so that it can be used by the importing files
module.exports = pool.promise();