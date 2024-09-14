require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const somethingRoutes = require('./routes/menus')

// express app 
const app = express()

// middleware
app.use (express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use('/api/something', somethingRoutes)

// connect to atlasDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen to the port
    app.listen(process.env.PORT, () => {
      console.log("listening to 4000")
    })  
  })
  .catch((error) => {
    console.log(error)
  })



