const router = require('express').Router();
const detailController = require('../controller/detail')


router.get('/:search', detailController.getDetailAbout)

module.exports = router
