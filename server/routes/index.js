const routes = require('express').Router()

routes.use('/auth', require('./auth'))
routes.use('/wishes', require('./wishes'))

module.exports = routes
