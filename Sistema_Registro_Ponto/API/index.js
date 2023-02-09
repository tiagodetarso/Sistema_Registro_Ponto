/* imports */
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()

const cors = require('cors')

// utilizar o cors
app.use(cors({origin: '*'}));

// forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true
    }),)    

// config json response
app.use(express.json())

// rotas 
const employeeRoutes = require('./routes/employeeRoutes')
app.use('/employee', employeeRoutes)

const registerRoutes = require('./routes/registerRoutes')
app.use('/register', registerRoutes)

// Public Route ou Open Route
app.get('/', (req, res) => {
    res.status(200).json({msg: "API Registro Ponto!"})
})

//Credencials
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.m8kpkpk.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(4500)
        console.log(("Conectado ao banco!"))
    })
    .catch((err) => console.log(err))

app.listen(4000)