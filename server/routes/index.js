const routes = require('express').Router()

routes.use('/auth', require('./auth'))
routes.use('/animals', require('./animals.js'))
routes.use('/organizations', require('./organizations'))
module.exports = routes
