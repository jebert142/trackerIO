const express = require('express')
const router = express.Router()
const Vehicle = require('../models/vehicle')


// Render Vehicles main page and Get all vehicles route
router.get('/', async(req, res) => {
    try{
        const vehicles = await Vehicle.find({})
        res.render('vehicles/index', {vehicles: vehicles})
    } catch {
        res.redirect('/')
    }
})

// Render 'create vehicles' page
router.get('/create', async(req, res) => {
    
    res.render('vehicles/create', {vehicle: new Vehicle()})
})


// Create vehicles route
router.post('/', async (req, res) => {
    const vehicle = new Vehicle({
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        year: req.body.year,
        mileage: req.body.mileage,
        vehicleNickname: req.body.vehicleNickname
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