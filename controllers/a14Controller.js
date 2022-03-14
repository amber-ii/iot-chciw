'use strict'
const a14Data = require('../data/a14data')

// 搜尋A14-R3
const getA14R3 = async(req, res, next) => {
    if (req.user.permission == 1 || req.user.permission == 5 || req.user.permission == 4) {
        try {
            const startDate = req.body.startDate
            const endDate = req.body.endDate
                // let location = req.body.location
            let locationValue = req.body.locationValue
            const rows = await a14Data.getA14R3(startDate, endDate, locationValue)
            res.send(rows)
        } catch (error) {
            res.status(400).send(error.message)
        }
    } else {
        res.sendFile(`${process.cwd()}/public/404.html`)
    }
}


module.exports = {
    getA14R3,

}