const mongoose = require('mongoose')
const path = require('path')

const logSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    performedBy: {
        type: String,
        required: true
    },
    overallCost: {
        type: Number,
        required: false
    },
    description: {
        type: Date,
        required: false
    }
})

//   Export log model
module.exports = mongoose.model('Log', logSchema)