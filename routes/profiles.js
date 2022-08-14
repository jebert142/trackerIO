const express = require('express')
const router = express.Router()
// const Profile = require('../models/profile')


// Get all profile info of current user
router.get('/', async(req, res) => {
    try{
        // const profileDet = await Profile.find({})
        res.render('profile/index')
    } catch {
        res.redirect('/')
    }
})


module.exports = router