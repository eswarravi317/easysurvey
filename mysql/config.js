let mysql = require('mysql2');
require('dotenv').config()

let connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

connection.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    else {
        console.log('Connected to the MySQL server.');
    }
});

module.exports = connection