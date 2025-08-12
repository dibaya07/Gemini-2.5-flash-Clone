const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 3000 
const connectDB= require("./config/connectDB.js")

connectDB()

app.get('/', (req, res) => {
  res.json({message:'Hello World!'})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})