const routes = require('express').Router()

routes.use('/auth', require('./auth'))
routes.use('/animals', require('./animals'))
routes.use('/organizations', require('./organizations'))
<<<<<<< HEAD
routes.use('/wishes', require('./wishes'))
=======
// routes.use('/wishes', require('./wishes'))
routes.use('/wishes', require('./wishes'))
routes.use('/details', require('./detail'))
// routes.use('/wishes', require('./wishes'))
>>>>>>> wiki trivia frontend

module.exports = routes
