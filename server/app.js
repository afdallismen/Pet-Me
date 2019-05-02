const express = require('express')
const mongoose = require('mongoose')

const routes = require('./routes')

const app = express()
const PORT = 3000

mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true })

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', routes)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})
