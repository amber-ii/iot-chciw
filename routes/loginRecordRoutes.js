const express = require('express')
const loginRecordController = require('../controllers/loginRecordController')
const router = express.Router()

router.get('/get/all', loginRecordController.getAllRecord)
router.get('/get/this_month', loginRecordController.getThisMonth)
router.get('/get/three_month', loginRecordController.getThreeMonth)
router.get('/get/six_month', loginRecordController.getSixMonth)
module.exports = {
    routes: router,
}