const routes = require('express').Router()

routes.use('/auth', require('./auth'))
routes.use('/animals', require('./animals'))
routes.use('/organizations', require('./organizations'))
// routes.use('/wishes', require('./wishes'))

module.exports = routes
