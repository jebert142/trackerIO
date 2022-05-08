const express = require('express')
const router = express.Router()
const Vehicle = require('../models/vehicle')


// Get vehicles route
router.get('/', async(req, res) => {
    
    res.render('vehicles/index')
})

// Create vehicles route
router.get('/create', async(req, res) => {
    
    res.render('vehicles/create', {vehicle: new Vehicle()})
})


// Create vehicles route
router.get('/', (req, res) => {
    const vehicle = new Vehicle({
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        year: req.body.year
    })
    vehicle.save((err, newvehicle) => {
        if (err){
            res.render('vehicles/create', {
                manufacturer: manufacturer,
                model: req.body.model,
                year: req.body.year,
                errorMessage: "Error Creating Vehicle"
            })
        } else {
            res.redirect('vehicles')
        }
    })
})

module.exports = router