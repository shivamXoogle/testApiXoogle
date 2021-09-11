const mongoose = require("mongoose");

const Station = new mongoose.model("Station", new mongoose.Schema({
    stationName: {
        type: String,
        required: true
    },
    manager1: {
        type: String,
    },
    DSO: {
        type: String,
    },
    address: {
        type: String
    },
    pincode: {
        type: Number,
    }
}, {
    timestamps: true,
    versionKey: false
}));

module.exports = Station;