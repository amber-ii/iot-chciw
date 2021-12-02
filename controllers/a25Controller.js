'use strict'
const a25Data = require('../data/a25data')

// 搜尋A25-2DCS
const getA25Dcs = async(req, res, next) => {
    if (req.user.permission == 1 || req.user.permission == 3) {
        try {
            const startDate = req.body.startDate
            const endDate = req.body.endDate
            let location = req.body.location
            let freq = req.body.freq
            let arr = []
            if (!location.toString().includes(',')) {
                arr.push(location)
                location = arr
            }
            console.log(startDate, endDate, location, freq)
            const rows = await a25Data.getA25DcsNew(startDate, endDate, location, freq)
            res.send(rows)
        } catch (error) {
            res.status(400).send(error.message)
        }
    } else {
        res.sendFile(`${process.cwd()}/public/404.html`)
    }
}

// 搜尋A25-3DCS
const getA25Dcs03 = async(req, res, next) => {
    if (req.user.permission == 1 || req.user.permission == 3) {
        try {
            const startDate = req.body.startDate
            const endDate = req.body.endDate
            let location = req.body.location
            let freq = req.body.freq
            let arr = []
            if (!location.toString().includes(',')) {
                arr.push(location)
                location = arr
            }
            const rows = await a25Data.getA25Dcs03New(startDate, endDate, location, freq)
            res.send(rows)
        } catch (error) {
            res.status(400).send(error.message)
        }
    } else {
        res.sendFile(`${process.cwd()}/public/404.html`)
    }
}

// 搜尋A25-3Filter
const getA25Dcs03Filter = async(req, res, next) => {
    if (req.user.permission == 1 || req.user.permission == 3) {
        try {
            const startDate = req.body.startDate
            const endDate = req.body.endDate
            let location = req.body.location
            let freq = req.body.freq
            let arr = []
            if (!location.toString().includes(',')) {
                arr.push(location)
                location = arr
            }
            console.log(startDate, endDate, location)
            const rows = await a25Data.getA25Dcs03FilterNew(startDate, endDate, location, freq)
            res.send(rows)
        } catch (error) {
            res.status(400).send(error.message)
        }
    } else {
        res.sendFile(`${process.cwd()}/public/404.html`)
    }
}

// 搜尋A25-1PLC
const getA25Plc = async(req, res, next) => {
    if (req.user.permission == 1 || req.user.permission == 3) {
        try {
            const startDate = req.body.startDate
            const endDate = req.body.endDate
            let location = req.body.location
            let freq = req.body.freq
            let arr = []
            if (!location.toString().includes(',')) {
                arr.push(location)
                location = arr
            }
            const rows = await a25Data.getA25PlcNew(startDate, endDate, location, freq)
            res.send(rows)
        } catch (error) {
            res.status(400).send(error.message)
        }
    } else {
        res.sendFile(`${process.cwd()}/public/404.html`)
    }
}

const getA25Auto = async(req, res, next) => {
    if (req.user.permission == 1 || req.user.permission == 3) {
        try {
            const startDate = req.body.startDate
            const endDate = req.body.endDate
            let location = req.body.location
            console.log('🚀 ~ file: a25Controller.js ~ line 104 ~ getA25Auto ~ location', location)
            let freq = req.body.freq
            let arr = []
            if (!location.toString().includes(',')) {
                arr.push(location)
                location = arr
            }
            const rows = await a25Data.getA25AutoNew(startDate, endDate, location, freq)
            res.send(rows)
        } catch (error) {
            res.status(400).send(error.message)
        }
    } else {
        res.sendFile(`${process.cwd()}/public/404.html`)
    }
}

module.exports = {
    getA25Dcs,
    getA25Dcs03,
    getA25Dcs03Filter,
    getA25Plc,
    getA25Auto,
}