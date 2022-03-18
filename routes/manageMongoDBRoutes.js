const express = require('express')
const controller = require('../controllers/manageMongoDBController')
const router = express.Router()


router.delete('/login/date/:date', controller.removeLoginRecordByDate)
router.delete('/login/user/:user', controller.removeLoginRecordByUser)
router.delete('/modbus/topic/:topicName', controller.removeModbusByTopic)
router.delete('/modbus/date/:breakDateRecord', controller.removeModbusByDate)

module.exports = {
    routes: router,
}

// mongo/login/date?loginDate=%2021-12-06%