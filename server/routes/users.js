const mysql = require('mysql');
const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');

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

const MIME_TYPE_MAP = {
    "image/png" : "png",
    "image/jpeg": "jpg",
    "image/jpg" : "jpg"
}

const storage = multer.diskStorage({
    destination:(req, file, callback) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if(isValid) {error = null};
        callback(error, "images");
    },
    filename: (req, file, callback) => {
        const name = file.originalname
        .toLowerCase()
        .split(" ")
        .join("-");
        const extension = MIME_TYPE_MAP[file.mimetype];
        callback(null, name + "-" + Date.now() + "." + extension); 
    }
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
    const email = req.body.data.email;
    const password = req.body.data.password;
    const name = req.body.data.name;

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

const jwtPrivateSecret = "AltF4mrntmeinlieb";

route.post('/login', async(req, res) => {
    const email = req.body.data.email;
    const password = req.body.data.password;

    connection.query(`SELECT * FROM users WHERE email='${email}' AND password= '${password}'`, async (err, result) => {
        if(result){
            jwt.sign({UserEmail: email}, jwtPrivateSecret, (err, token) => {
                res.status(200).send({token : token});
            });
        }
        if(!result){
            res.status(400).send({message:'Error not found'});
        }
    });
})

route.get('/get-user', async (req, res) => {
    const Token = req.headers['authorization'];
    let decodedToken = jwt.decode(Token, {complete: true});
    const UserEmail = decodedToken.payload.UserEmail;

    const query = `SELECT * FROM users WHERE email='${UserEmail}';`;

    connection.query(query, (err, result) => {
        if(err) throw err;
        res.status(200).send({result});
    })

})

const upload = multer({
    storage: storage, limits: {fieldSize: 12*1024*1024},
}).single("image");

route.put('/update/:id', upload, (req, res, next)=> {
    if(req.file && req.file !== ''){
        console.log("work")
        const id = req.params.id;
        const URL = req.protocol + "://" + req.get("host");
        const picture = URL + "/images/" + req.file.filename;

        const name = req.body.name;
        const address = req.body.address;

        const query = `UPDATE users SET name='${name}', address='${address}', picture='${picture}' WHERE id='${id}';`;

        connection.query(query, (err, result) => {
            if(err) throw err;
            res.status(200).send({message: "Data successfully updated", result})
        })
    } else {
        const id = req.params.id;
        const name = req.body.name;
        const address = req.body.address;

        const query = `UPDATE users SET name='${name}', address='${address}' WHERE id='${id}';`;
        connection.query(query, (err, result) => {
            if(err) throw err;
            res.status(200).send({message: "Data successfully updated", result})
        })
    }
});

route.delete('/delete/:id/:password', (req, res, next) => {
    const id = req.params.id;
    const password = req.params.password;

    const query = `SELECT * FROM users WHERE id='${id}' AND password='${password}'`;

    connection.query(query, async (err, result) => {
        if(result.length > 0){
            const deleteQuery = `DELETE FROM users WHERE id='${id}'`;
            connection.query(deleteQuery, async(err, result) => {
                if(err) throw err;
                res.status(200).send({message: "Data successfully deleted", result})
            })
        } else if (result.length === 0){
            res.status(400).send({message:'Incorrect user password'});
        }

    });


});


module.exports = route;