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


// Create vehicles from create form
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
    } catch (e) {
        res.render('vehicles/edit', {
            vehicle: vehicle,
            errorMessage: "Error Creating Vehicle"
        })
    }
})


//  render vehicle data on page
//  @param vehicle to edit
router.get('/:id/details', async (req, res) => {
    try{
        const vehicles = await Vehicle.findById(req)
        res.render('vehicles/details', {vehicles: vehicles})
    } catch {
        res.redirect('/vehicles')
    }
})

// route and logic for the edit function
// @param vehicle.id  --> passes to edit form to load details
router.get('/:id/edit', async (req, res) => {
    console.log("'/vehicles/:id/edit'")
    try{
        let params = req.params
        let vehicle_id = req.params.id
        if (!vehicle_id) { // bad request
            res.status(400).send()
            return
        }
        const vehicle = await Vehicle.findById(req.params.id)
        console.log("vehicles" , vehicle)
        if (!vehicle || typeof vehicle == 'undefined') { // I *THINK* you might be able to just say !vehicle nowadays... Im old
            // TODO: show error page (not found) or res.status(404).send()
            console.error("WARNING: Vehicle requested but not found with ID", req)
            res.status(404).send()
            return
        } else {
            res.render('vehicles/edit', {vehicle: vehicle })
        }
    } catch {
        res.redirect('/vehicles')
    }
})

// Vehicle edit save routing
router.put('/vehicles/:id/edit', async (req, res) => {    
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
    } catch (e) {
        res.render('vehicles/edit', {
            vehicle: vehicle,
            errorMessage: "Error Creating Vehicle"
        })
    }
})


//  Delete vehicle
router.delete('/:id', async (req, res) => {
    res.send('Delete vehicle ' + req.params.id)
})

module.exports = router