const mysql = require('mysql');
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const connection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    database: 'git_profile_fetcher'
})

connection.connect((err) => {
    if(err) throw err;
    console.log('connected');
})

const selectOrCreateTable = () => {
    connection.query('SELECT * FROM users', (err, result, fields) => {
        if(err){
            const query = 'CREATE TABLE users(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), password VARCHAR(255), picture VARCHAR(255), email VARCHAR(255) NOT NULL UNIQUE, address VARCHAR(255))';
            connection.query(query, (err, result) => {
                if(err) throw err;
            });
        }
    })
}

selectOrCreateTable();

module.exports = router;