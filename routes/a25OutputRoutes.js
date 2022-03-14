const express = require('express')
const controller = require('../controllers/a25OutputController.js')
const router = express.Router()

router.post('/', controller.getByDate)


module.exports = {
    routes: router,
}