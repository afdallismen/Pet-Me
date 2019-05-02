require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const routes = require('./routes')

const app = express()
const PORT = 3000

mongoose.connect('mongodb://localhost:27017/petme', { useNewUrlParser: true })

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', routes)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})
