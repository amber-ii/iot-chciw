const schedule = require('node-schedule')
const LoginRecord = require('../models/Login')
const Modbus = require('../models/Modbus')
const moment = require('moment-timezone')



// 登入紀錄 日期
const removeLoginRecordByDate = async(req, res, next) => {
        try {
            const removeLoginRecord = await LoginRecord.remove({ loginDate: { $lt: req.params.date } })
            res.send(removeLoginRecord)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
    // 登入紀錄 使用者
const removeLoginRecordByUser = async(req, res, next) => {
    try {
        const removeLoginRecord = await LoginRecord.remove({ username: req.params.user })
        res.send(removeLoginRecord)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

// Modbus By Topic
const removeModbusByTopic = async(req, res, next) => {
    try {
        const removeModbusRecord = await Modbus.remove({ topic: req.params.topicName })
        res.send(removeModbusRecord)
    } catch (error) {
        res.status(400).send(error.message)
    }
}


// Modbus By Date
const removeModbusByDate = async(req, res, next) => {
    try {
        const removeModbusRecord = await Modbus.remove({ breakDate: { $lte: req.params.breakDateRecord } })
        res.send(removeModbusRecord)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    removeLoginRecordByDate,
    removeLoginRecordByUser,
    removeModbusByTopic,
    removeModbusByDate,
}