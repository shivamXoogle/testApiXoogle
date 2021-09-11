const jwt = require('../config/jwt');
const app = require('express')();

// public
app.use('/auth', require('./routes/auth'));

// private
app.use('/employees', jwt.verify, require('./routes/employees'));
app.use('/stations', jwt.verify, require('./routes/stations'));
app.use('/bills', jwt.verify, require('./routes/bills'));
app.use('/testApi', require('./routes/testApi'));

module.exports = app;