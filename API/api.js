const jwt = require('../config/jwt');
const app = require('express')();

app.use('/testApi', require('./routes/testApi'));

module.exports = app;