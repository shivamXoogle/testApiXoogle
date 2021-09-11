const jwt = require('../config/jwt');
const app = require('express')();

// public routes
app.use('/auth', require('./routes/auth'));

// private routes
app.use('/stations', jwt.verify, require('./routes/stations'));
app.use('/sales', jwt.verify, require('./routes/sales'));
module.exports = app;