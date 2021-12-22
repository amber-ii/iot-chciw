'use strict'
const utils = require('../utils')
const config = require('../../config')
const sql = require('mssql')

let pool
const getEvent = async() => {
    try {
        pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('water')
        const list = await pool.request().query(sqlQueries.waterList)
        return list.recordset
    } catch (error) {
        console.log(error.message)
    } finally {
        pool.close()
        console.log('connection close')
    }
}

const getEvent_Chart_7 = async() => {
    try {
        pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('water')
        var list = await pool.request().query(sqlQueries.waterChart7)
        return list.recordset
    } catch (error) {
        console.log(error.message)
    } finally {
        pool.close()
    }
}

const getEvent_Chart_30 = async() => {
    try {
        pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('water')
        var list = await pool.request().query(sqlQueries.waterChart30)
        return list.recordset
    } catch (error) {
        console.log(error.message)
    } finally {
        pool.close()
    }
}

const getEvent_Chart_6_M = async() => {
    try {
        pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('water')
        var list = await pool.request().query(sqlQueries.waterChart6M)
        return list.recordset
    } catch (error) {
        console.log(error.message)
    } finally {
        pool.close()
    }
}

const getEvent_Chart_12_M = async() => {
    try {
        pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('water')
        var list = await pool.request().query(sqlQueries.waterChart12M)
        return list.recordset
    } catch (error) {
        console.log(error.message)
    } finally {
        pool.close()
    }
}


const getEventByDate = async(startDate, endDate) => {
    try {
        pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('water')
        const event = await pool.request().input('startDate', sql.Date, startDate).input('endDate', sql.Date, endDate).query(sqlQueries.waterByDate)
        return event.recordset
    } catch (error) {
        return error.message
    } finally {
        pool.close()
        console.log('connection close')
    }
}

module.exports = {
    getEvent,
    getEvent_Chart_7,
    getEvent_Chart_30,
    getEventByDate,
    getEvent_Chart_6_M,
    getEvent_Chart_12_M,
}