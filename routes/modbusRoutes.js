const express = require('express')
const controller = require('../controllers/modbusController')
const router = express.Router()

// router.get('/get/all', controller.getAllRecord)
router.get('/get/week', controller.getThisWeek)
// router.get('/get/month', controller.getThisMonth)
router.get('/topic/:topics', controller.getByTopicName)


module.exports = {
    routes: router,
}