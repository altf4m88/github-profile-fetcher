const mysql = require('mysql');
const express = require('express');
const jwt = require('jsonwebtoken');

const route = express.Router();

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

route.post('/register', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    connection.query(`SELECT * FROM users WHERE email = '${email}'`, (err, result) => {
        if(err){
            res.send({err : err});
        }
        if(result.length === 0){
            let query = `INSERT INTO users(name, email, password) VALUES('${name}', '${email}', '${password}')`;
            connection.query(query, (err, result) => {
                if(err) throw err;
                res.status(200).send({result});
                console.log(result);
            });
        } else {
            return res.status(201).send({message : 'Email has already taken'});
        }
    });
})

const jwtPrivateSecret = "";

route.post('/login', async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    connection.query(`SELECT * FROM users WHERE email='${email}' AND password= '${password}'`, async (err, result) => {
        if(result.length !== 0){
            jwt.sign({UserEmail: email}, jwtPrivateSecret, (err, token) => {
                res.status(200).send({token : token});
            });
        }
        if(result.length === 0){
            res.status(400).send({message:'Error not found'});
        }
    });
})


module.exports = route;