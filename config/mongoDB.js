const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oou4c.mongodb.net/${process.env.DATABASE}`, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, });
        if (conn)
            console.log('DB_CONNECTED');
        else
            console.log('DB_CONNECTED_FAILTED : ', conn);

    } catch (err) {
        console.log(err);
    }
}
module.exports = {
    connect: connectDB
};