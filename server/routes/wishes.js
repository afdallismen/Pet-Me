const routes = require('express').Router()

const UserController = require('../controllers/User')
const { authenticate } = require('../middlewares/auth')

routes.use('/', authenticate)

routes.put('/', UserController.addWish)
routes.delete('/', UserController.removeWish)

module.exports = routes
