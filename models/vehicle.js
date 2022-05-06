const mongoose = require('mongoose')
const path = require('path')

const vehicleSchema = new mongoose.Schema({
    manufacturer: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Date,
        required: true
    }
})