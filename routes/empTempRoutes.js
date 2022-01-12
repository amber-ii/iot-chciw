const express = require('express')
const controller = require('../controllers/empTempController.js')
const router = express.Router()


router.get('/notify', controller.getAll) //警告
router.post('/', controller.getByDate) //報表查詢
// router.post('/cardno', controller.getByID) //發燒
router.get('/', function(req, res, next) {
    const state = '200'
    res.redirect(
        `https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=CWn9I0DUEzbJNwI60TpN03&redirect_uri=http://web.chciw.com.tw:8080/line/callback&scope=notify&state=200`
    )
})
router.get('/callback', async function(req, res, next) {
    res.send(req.query)
})
router.get('/callback1', async function(req, res, next) {
    res.send(req.query)
})

router.get('/line1', function(req, res, next) {
    const state = '200'
    res.redirect(
        `https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=3ARBBeUSgmIGNG8tdFle8q&redirect_uri=http://web.chciw.com.tw:8080/line/callback1&scope=notify&state=200`
    )
})


module.exports = {
    routes: router,
}


