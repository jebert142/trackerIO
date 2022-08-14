const mongoose = require('mongoose')
const path = require('path')

const vehiclePhotoBasePath = 'uploads/vehiclePhotos'

const vehicleSchema = new mongoose.Schema({
    manufacturer: {
    type: String,
    required: true
    },
    model: {
        type: String,
        required: true
    },    
    year: {
        type: Number,
        required: true
    },
    mileage: {
        type: Number,
        required: true
    },
    vehicleNickname: {
        type: String,
        required: true,
    },
    vehiclePhoto: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Vehicle'
    }
})

vehicleSchema.virtual('vehiclePhotoPath').get(function() {
    if (this.vehiclePhoto != null) {
      return path.join('/', vehiclePhotoBasePath, this.vehiclePhoto)
    }
  })


//   Export both full vehicle model and vehicle cover image
module.exports = mongoose.model('Vehicle', vehicleSchema)
module.exports.vehiclePhotoBasePath = vehiclePhotoBasePath