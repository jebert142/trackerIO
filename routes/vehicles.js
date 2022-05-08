const express = require('express')
const router = express.Router()
const Vehicle = require('../models/vehicle')


// Get all vehicles route
router.get('/', async(req, res) => {
    try{
        const vehicles = await Vehicle.find({})
        res.render('vehicles/index', {vehicles: vehicles})
    } catch {
        res.redirect('/')
    }
})

// Create vehicles route
router.get('/create', async(req, res) => {
    
    res.render('vehicles/create', {vehicle: new Vehicle()})
})


// Create vehicles route
router.post('/', async (req, res) => {
    const vehicle = new Vehicle({
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        vehicleNickname: req.body.vehicleNickname,
        year: req.body.year
    })
    try {
        const newVehicle = await vehicle.save()
        // res.redirect('vehicles/${newVehicle.id}')
        res.redirect('vehicles')
    } catch {
        res.render('vehicles/create', {
            vehicle: vehicle,
            errorMessage: "Error Creating Vehicle"
        })
    }
    
})

module.exports = router