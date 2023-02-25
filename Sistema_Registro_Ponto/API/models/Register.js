const mongoose = require('mongoose')

const Register = mongoose.model('Register', {
    registration: String,
    geoLocal: Object,
    numberTime: Number,
    image: Buffer
})

module.exports = Register