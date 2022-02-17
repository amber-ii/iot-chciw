'use strict'
const utils = require('../utils')
const config = require('../../config')
const sql = require('mssql')

let pool
    // const getEvent = async() => {
    //     try {
    //         pool = await sql.connect(config.sql)
    //         const sqlQueries = await utils.loadSqlQueries('water')
    //         const list = await pool.request().query(sqlQueries.waterList)
    //         return list.recordset
    //     } catch (error) {
    //         console.log(error.message)
    //     } finally {
    //         pool.close()
    //         console.log('connection close')
    //     }
    // }

const getEventByDate = async(startDate, endDate, LorS, LEVEL8, factory) => {
    try {
        pool = await sql.connect(config.sql2)
        const sqlQueries = await utils.loadSqlQueries('particle')
        const event = await pool
            .request()
            .input('startDate', sql.Date, startDate)
            .input('endDate', sql.Date, endDate)
            .input('LorS', sql.Int, LorS)
            .input('LEVEL8', sql.VarChar(100), LEVEL8)
            .input('factory', sql.VarChar(100), factory)
            .query(sqlQueries.particleByDate)
        console.log('我是index.event' + event)
        console.log('🚀 ~ file: index.js ~ line 35 ~ getEventByDate ~ event.recordset', event.recordset)
        return event.recordset
    } catch (error) {
        return error.message
    } finally {
        pool.close()
        console.log('connection close')
    }
}

module.exports = {
    // getEvent,
    getEventByDate,
}