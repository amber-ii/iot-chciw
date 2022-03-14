'use strict'
const utils = require('../utils')
const config = require('../../config')
const sql = require('mssql')

let pool
const getByDate = async(startDate, endDate) => {
    try {
        pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('a25Output')
        const event = await pool
            .request()
            .input('startDate', sql.Date, startDate)
            .input('endDate', sql.Date, endDate)
            .query(sqlQueries.a25OutputByDate)
        return event.recordset
    } catch (error) {
        return error.message
    } finally {
        pool.close()
    }
}

module.exports = {
    getByDate,
}