// dependencies
const express = require("express");
const app = express();
const cors = require('cors');
require('dotenv').config();

// monogo connect
app.use(cors());
app.use(express.json());
const mongoDB = require('./config/mongoDB');

// app starts
app.listen(process.env.PORT, () => {
    console.log('APP_STARTED_PORT', process.env.PORT);
    mongoDB.connect();
});

// app header
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,GET,DELETE');
//         return res.status(201).json({});
//     }
//     next();
// });

// index 
app.get('/', (req, res) => {
    return res.json({
        status: 200,
        message: "IGL_API"
    })
});

// routes
app.use('/api', require('./API/api'));

// admin APIs
app.use('/admin', require('./Admin/admin'));


app.use('*', (req, res) => {
    return res.json({
        status: 204,
        message: 'UNKNOWN_API'
    })
});