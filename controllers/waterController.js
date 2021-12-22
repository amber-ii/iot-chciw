// 'use strict'
const Data = require('../data/water')

// 報表預設七天
const getAll = async(req, res, next) => {
    if (req.user.permission == 1 || req.user.permission == 3) {
        try {
            const rows = await Data.getEvent()
            res.set({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            })
            res.send(rows)
                // res.render('sacid', { rows, title: '硫酸' })
        } catch (error) {
            res.status(400).send(error.message)
        }
    } else {
        res.sendFile(`${process.cwd()}/public/404.html`)
    }
}

const getChartLoop = (rows) => {
    let newData = [],
        // _Press = [],
        // _I1sp = [],
        // _I2sp = [],
        newSaveAmount = []

    for (let i = 0; i < rows.length; i++) {
        newData.push(rows[i].Date)
            // _Press.push(rows[i].Press)
            // _I1sp.push(rows[i].I1sp)
            // _I2sp.push(rows[i].I2sp)
        newSaveAmount.push(rows[i].SaveAmount)
    }
    let date = {
        label: newData,
        // Press: _Press,
        // I1sp: _I1sp,
        // I2sp: _I2sp,
        SaveAmount: newSaveAmount,
    }
    return date
}

const getChart = async(req, res, next) => {
    try {
        // 7天
        let rows0 = await Data.getEvent_Chart_7()
            // 30天
        let rows1 = await Data.getEvent_Chart_30()
        let rows2 = await Data.getEvent_Chart_6_M()
        let rows3 = await Data.getEvent_Chart_12_M()
        let date7 = getChartLoop(rows0)
        let date30 = getChartLoop(rows1)
        let date6M = getChartLoop(rows2)
        let date12M = getChartLoop(rows3)
        res.send({
            dates: {
                '7days': { data: date7 },
                '30days': { data: date30 },
                '6months': { data: date6M },
                '12months': { data: date12M },
            },
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

// 依日期查詢
const getByDate = async(req, res, next) => {
    try {
        const startDate = req.body.startDate
        const endDate = req.body.endDate
        const rows = await Data.getEventByDate(startDate, endDate)
        res.send(rows)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    getAll,
    getChart,
    getByDate,
}