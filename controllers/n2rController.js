'use strict'
const n2rData = require('../data/n2r')
const mqtt = require('mqtt')

// 預設查詢七天
const getAllN2R = async(req, res, next) => {
    if (req.user.permission == 1 || req.user.permission == 5 || req.user.permission == 4) {
        try {
            const rows = await n2rData.getN2R()
            res.render('n2r', { rows, title: '氮氣' })
        } catch (error) {
            res.status(400).send(error.message)
        }
    } else {
        res.sendFile(`${process.cwd()}/public/404.html`)
    }
}

const getTrendLoop = (rows) => {
    let newData = [],
        newA3t1 = [],
        newA3t2 = [],
        newA4t1 = [],
        newA8t1 = [],
        newA16t1 = [],
        newA2t1 = []
    for (let i = 0; i < rows.length; i++) {
        newData.push(rows[i].Date)
        newA3t1.push(rows[i].a3t1)
        newA3t2.push(rows[i].a3t2)
        newA4t1.push(rows[i].a4t1)
        newA8t1.push(rows[i].a8t1)
        newA16t1.push(rows[i].a16t1)
        newA2t1.push(rows[i].a2t1)
    }
    let date = {
        label: newData,
        a3t1: newA3t1,
        a3t2: newA3t2,
        a4t1: newA4t1,
        a8t1: newA8t1,
        a16t1: newA16t1,
        a2t1: newA2t1,
    }
    return date
}

const getAllN2RJSON = async(req, res, next) => {
    try {
        // 7天
        let rows0 = await n2rData.getN2RJSONSeven()
            // 30天
        let rows1 = await n2rData.getN2RJSONThirty()
        let rows3 = await n2rData.getN2RNow()
        let date7 = await getTrendLoop(rows0)
        let date30 = await getTrendLoop(rows1)
        let datemins = await getTrendLoop(rows3)
        res.send({
            dates: {
                '7days': { data: date7 },
                '30days': { data: date30 },
                'flow': { data: datemins },
            },
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getN2RChartNow = async(req, res, next) => {
    try {
        // 7天
        let rows1 = await n2rData.getN2RNow()
            // 30天
            // let rows1 = await n2rData.getN2RJSONThirty()
        let date1 = getTrendLoop(rows1)
            // let date30 = getTrendLoop(rows1)
        res.send({
            dates: {
                '1days': { data: date1 },
                // '30days': { data: date30 },
            },
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

// 報表依日期查詢
const getN2RByDate = async(req, res, next) => {
    try {
        const startDate = req.body.startDate
        const endDate = req.body.endDate
        const ft = req.body.FT
        const rows = await n2rData.getByDate(startDate, endDate, ft)
        res.send(rows)
    } catch (error) {
        res.status(400).send(error.message)
    }
}




module.exports = {
    getAllN2R,
    getAllN2RJSON,
    getN2RByDate,
    getN2RChartNow,
}