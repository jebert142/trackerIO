if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config({})  //loads local host database details for MongoDB database
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

//Importing all components
const indexRouter = require('./routes/index')
const vehicleRouter = require('./routes/vehicles')
const logRouter = require('./routes/logs')
const profileRouter = require('./routes/profiles')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views') //server views
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public')) //public views
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))

//Database setup
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

//Enabling all components
app.use('/', indexRouter)
app.use('/vehicles', vehicleRouter)
app.use('/logs', logRouter)
app.use('/profile', profileRouter)

app.listen(process.env.PORT || 3000 )