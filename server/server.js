const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

//user
const User = require('./routes/users');


const app = express();

app.use(cors({origin: '*'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const connection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    database: 'git_profile_fetcher'
})

connection.connect((err) => {
    if(err) throw err;
})

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/', express.static(path.join(__dirname, 'react')));

//app.use('/api/users', User)

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`App listening on port ${port}`));