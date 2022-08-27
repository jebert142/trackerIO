const express = require('express')
const router = express.Router() 
const Vehicle = require('../models/vehicle')


// Render Vehicles main page and Get all vehicles route
// @param search query
router.get('/', async(req, res) => {
    const vehicleQuery = req.query 
    // console.log(req.query.search)

    try{       
        const vehicles = await Vehicle.find({})// if no request data, render all vehicles
        if(!vehicleQuery){
            res.render('vehicles/index', {vehicles: vehicles})
            // console.log("if")
        } else {  //else, take query and render vehicles against search params
            query = Vehicle.findById(vehicleQuery)
            // console.log(query)
            res.render('vehicles/index', {vehicles: vehicles})
            // console.log("else")
        }
    } catch(e) {
        const vehicles = await Vehicle.find({})
        res.render('vehicles/', {
            vehicles: vehicles,
            errorMessage: "Error Creating Vehicle"
        })
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


// route and logic for the edit page
// @param vehicle.id  --> passes to edit form to load details
router.get('/:id/edit', async (req, res) => {
    try{
        let vehicle_id = req.params.id
        if (!vehicle_id) { // bad request
            res.status(400).send()
            return
        }
        const vehicle = await Vehicle.findById(req.params.id)
        // console.log("vehicles" , vehicle)
        if (!vehicle || typeof vehicle == 'undefined') { // I *THINK* you might be able to just say !vehicle nowadays... Im old
            // TODO: show error page (not found) or res.status(404).send()
            // console.error("WARNING: Vehicle requested but not found with ID", req)
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
// @param Vehicle.ID
router.put('/vehicles/:id/save', async (req, res) => {    
    let vehicleToEdit
    try {
        vehicleToEdit = await Vehicle.findById(req.params.id)
        await vehicleToEdit.save()
        res.redirect('/vehicles/edit', {vehicle: vehicleToEdit})
        console.log("tried to save") //remove
    } catch (e) {
        if (vehicleToEdit == null){
            res.render('/vehicles', {
                vehicle: vehicleToEdit,
                errorMessage: "Vehicle Not Found",
            })
            console.log("made it to the if on catch") //remove
        } else {
            res.render('/vehicles/edit', {
            vehicle: vehicleToEdit,
            errorMessage: "Error Saving Changes",
            })
            console.log("made it to the else on catch") //remove
        }
        
    }
})


//  Delete vehicle
router.delete('vehicles/:id/delete', async (req, res) => {
    let vehicle 
    try{
        vehicle = await Vehicle.findById(req.params.id)
    }catch(e) {
        if(vehicle == null){
            res.render('/vehicles', {
                vehicle: vehicle,
                errorMessage: "Vehicle Not Found",
            })
        }else{
            res.render('/vehicles', {
                vehicle: vehicle,
                errorMessage: "Error trying to delete the selected vehicle",
                })
        }
    }
    
    
    res.send('Delete vehicle ' + req.params.id)
})

module.exports = router