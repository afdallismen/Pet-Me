require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const ax = require('axios')

const routes = require('./routes')

const app = express()
const PORT = 3000

mongoose.connect('mongodb://localhost:27017/petme', { useNewUrlParser: true })

const app = express()
const PORT = 4444
// mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true })
app.use(require('volleyball'))
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', routes)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
  ax({
    baseURL: "https://api.petfinder.com/v2/oauth2/token",
    method: "POST",
    data: {
        grant_type: "client_credentials",
        client_id: process.env.PET_FINDER_API_KEY,
        client_secret: process.env.PET_FINDER_SECRET
    }
  }).then((token) => {
      process.env.ACCESS_TOKEN = token.data.access_token
      console.log(process.env.ACCESS_TOKEN)
  }).catch(err => {
      res.status(500).json(err)
  })
})
