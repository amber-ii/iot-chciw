const express = require('express')
const a25Controller = require('../controllers/a25Controller')
const router = express.Router()

router.post('/dcs', a25Controller.getA25Dcs)

router.post('/dcs03', a25Controller.getA25Dcs03)
router.post('/dcs03filter', a25Controller.getA25Dcs03Filter)
router.post('/plc', a25Controller.getA25Plc)
router.post('/auto', a25Controller.getA25Auto)

module.exports = {
    routes: router,
}