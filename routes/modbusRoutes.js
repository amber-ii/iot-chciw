const express = require('express')
const controller = require('../controllers/modbusController')
const router = express.Router()

router.get('/get/all', controller.getAllRecord)
router.get('/get/week', controller.getThisWeek)
router.get('/get/month', controller.getThisMonth)

module.exports = {
    routes: router,
}