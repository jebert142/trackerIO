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
    // type: {
    //     type: Array = new [],
    //     required: false
    // },
    description: {
        type: Date,
        required: true
    }
})