const express = require('express')
const router = express.Router()
const Organizations = require('../controllers/organizations')

router.get('/', Organizations.getAll)
router.get('/:id', Organizations.getById)

module.exports = router