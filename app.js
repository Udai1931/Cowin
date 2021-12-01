const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

const PORT = process.env.PORT || 5000
const {MONGOURI} = require('./config/keys')

//DB CONNECTION:
mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})
mongoose.connection.on('connected', () => {
    console.log("Connected to Mongo")
})
mongoose.connection.on('error', (err) => {
    console.log("Error connecting Mongo",err)
})

//MODELS    
require('./models/user')
// require('./models/post')

//MIDDLEWARE
app.use(cors())
app.use(express.json())

//ROUTES
app.use(require('./routes/auth'))
// app.use(require('./routes/post'))
// app.use(require('./routes/user'))

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

//CONNECTIONS
app.listen(5000,() => {
    console.log("Server Running")
})