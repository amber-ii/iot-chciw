// 'use strict'
const utils = require('../utils')
const config = require('../../config')
const sql = require('mssql')
const rp = require('request-promise')
const schedule = require('node-schedule')

let pool


function formatDate(now) {
    let date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()
    let hour = new Date().getHours()
    console.log('小時' + hour)
    let lineTime = ""
    if ((hour == '9')) {
        lineTime = '早上'
    }
    if ((hour == '16')) {
        lineTime = '下午'
    }
    if ((hour == '20')) {
        lineTime = '晚上'
    }
    let toLine = date + '_' + lineTime
    return toLine
}



// 發送警告值
const getEvent = async() => {

    try {
        pool = await sql.connect(config.sql)
        let sqlQueries = await utils.loadSqlQueries('a4Line')
        let list = await pool.request().query(sqlQueries.a4Event)
        return list.recordset
    } catch (error) {
        console.log(error.message)
    } finally {
        pool.close()
    }
}

module.exports = {
    getEvent,
}