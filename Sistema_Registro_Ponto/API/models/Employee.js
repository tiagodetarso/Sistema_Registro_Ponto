const mongoose = require('mongoose')

const Employee = mongoose.model('Employee', {
    name: String,
    registration: String,
    email: String,
    sector: String,
    position: String,
    workload: Number,
    isManager: Boolean,
    password: String,
    retrievePassword: String
})

module.exports = Employee