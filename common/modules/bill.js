const mongoose = require("mongoose");

const Bill = new mongoose.model("Bill", new mongoose.Schema({
    Station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station',
        required: true
    },
    generatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    dispensor: {
        type: Number,
    },
    side: {
        type: String,
    },
    name: {
        type: String,
    },
    contactNumber: {
        type: Number,
    },
    billNumber: {
        type: String,
        unique: true
    },
    vehicleNumber: {
        type: String,
    },
    fuelType: {
        type: String,
    },
    CNGRate: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    amount: {
        type: Number,
    }
}, {
    timestamps: true,
    versionKey: false
}));

module.exports = Bill;