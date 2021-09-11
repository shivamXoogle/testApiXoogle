const mongoose = require("mongoose");

const Employee = new mongoose.model("Employee", new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    Station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station',
        required: true
    },
    designation: {
        type: String
    },
    managerName: {
        type: String,
    },
    fingerprint1: {
        type: String,
    },
    fingerprint2: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
}));

module.exports = Employee;