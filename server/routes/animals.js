const express = require('express')
const router = express.Router()
const Animals = require('../controllers/animals')

router.get('/', Animals.getAll)
router.get('/types', Animals.getTypes)
router.get('/types/:type', Animals.getType)
router.get('/types/:type/breeds', Animals.getBreeds)
router.get('/:id', Animals.getById)

module.exports = router