const mysql = require('mysql2');

const pool = mysql.createPool({
    host:"localhost",
    database:"node_db",
    user:"root",
    password:"guna"
});

module.exports = pool.promise();