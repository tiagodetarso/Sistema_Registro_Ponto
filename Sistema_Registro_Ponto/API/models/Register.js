const mongoose = require('mongoose')

const Register = mongoose.model('Register', {
    registration: String,
    geoLocal: Object,
    numberTime: Number
})

module.exports = Register