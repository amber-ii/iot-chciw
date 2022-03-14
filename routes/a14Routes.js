const express = require('express')
const controller = require('../controllers/a14Controller')
const router = express.Router()

router.post('/r3', controller.getA14R3)


module.exports = {
    routes: router,
}