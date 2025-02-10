const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'rohit@123', 
    database: 'rohit_dave',
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

module.exports = connection;
