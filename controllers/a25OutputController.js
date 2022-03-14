'use strict'
const Data = require('../data/a25Output')

// 搜尋A14-R3
const getByDate = async(req, res, next) => {
    if (req.user.permission == 1 || req.user.permission == 3 || req.user.permission == 4) {
        try {
            const startDate = req.body.startDate
            const endDate = req.body.endDate
            const rows = await Data.getByDate(startDate, endDate)
            res.send(rows)
        } catch (error) {
            res.status(400).send(error.message)
        }
    } else {
        res.sendFile(`${process.cwd()}/public/404.html`)
    }
}

module.exports = {
    getByDate,
}