const express = require('express')
const controller = require('../controllers/waterController')
const router = express.Router()

router.get('/list', controller.getAll)
router.get('/chart', controller.getChart)
router.post('/', controller.getByDate)

module.exports = {
    routes: router,
}