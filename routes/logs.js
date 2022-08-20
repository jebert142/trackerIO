const express = require('express')
const router = express.Router()
const Log = require('../models/log')
const Vehicle = require('../models/vehicle')

// Get all logs route
router.get('/', async(req, res) => {
    try{
        const log = await Log.find({})
        res.render('logs/index', {log: log})
    } catch {
        res.redirect('/')
    }
})

// Get Create Log page
router.get('/newLog', async(req, res) => {
    
    res.render('logs/newLog', {log: new Log()})
})


// Create log route
router.post('/', async (req, res) => {
    const log = new Log({
        title: req.body.title,
        date: req.body.date,
        performedBy: req.body.performedBy,
        overallCost: req.body.overallCost,
        description: req.body.description
    })
    try {
        const newLog = await log.save()
        // res.redirect('vehicles/${newVehicle.id}')
        res.redirect('logs')
    } catch {
        res.render('logs/newLog', {
            log: log,
            errorMessage: "Error Creating Log"
            
        })
    }
    
})



module.exports = router