const express = require('express')
const router = express.Router()
//import other models here  const modelName = require('../models/modelName')

router.get('/', async(req, res) => {
    
    res.render('index')
})

module.exports = router