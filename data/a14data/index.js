'use strict'
const utils = require('../utils')
const config = require('../../config')
const sql = require('mssql')

let pool
const getA14R3 = async(startDate, endDate, locationValue) => {
    try {
        pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('a14data')
        const event = await pool
            .request()
            .input('startDate', sql.Date, startDate)
            .input('endDate', sql.Date, endDate)
            // .input('location', sql.VarChar, location)
            .input('locationValue', sql.Int, locationValue)
            .query(sqlQueries.a14R3)
        return event.recordset
    } catch (error) {
        return error.message
    } finally {
        pool.close()
    }
}

module.exports = {
    getA14R3,
}