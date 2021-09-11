const mongoose = require("mongoose");

const Admin = new mongoose.model("Admin", new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
}));

module.exports = Admin;