// 'use strict'
const utils = require('../utils')
const config = require('../../config')
const sql = require('mssql')
const rp = require('request-promise')
const schedule = require('node-schedule')
let pool



// const getEvent1 = async() => {
//     let CardID = ''
//     try {
//         pool = await sql.connect(config.sql)
//         let sqlQueries = await utils.loadSqlQueries('empTemp')
//         let list = await pool.request().query(sqlQueries.empTempList)

//         for (let i = 0; i < list.recordset.length; i++) {
//             CardID += `'${list.recordset[i].CardID}',`
//         }
//         let reg = /,$/gi
//         CardID = CardID.replace(reg, '')
//         pool.close()
//         pool = await sql.connect(config.sql_HRM)
//         let event = await pool
//             .request()
//             .query(
//                 `SELECT distinct Ca.CardNo as 'CardNo', Em.Code '工號', Em.CnName '姓名', De.ShortName '部門' FROM[HRMDB].[dbo].[Card] As Ca inner join[HRMDB].[dbo].[Employee] as Em on Ca.EmployeeId = Em.EmployeeId inner join[HRMDB].[dbo].[Department] as De on Em.DepartmentId = De.DepartmentId where Ca.CardNo in (${CardID}) and Ca.RevokeTypeId = '-1' and Ca.UseTypeId = 'UseType_001'`
//             )
//         return event.recordset
//     } catch (error) {
//         console.log(error.message)
//     } finally {
//         pool.close()
//     }
// }


var roundDecimal = function(val, precision) {
    return Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) / Math.pow(10, precision || 0)
}

function formatDate(now) {
    let date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()
    let hour = new Date().getHours()
    let lineTime = ''
    if ((hour == 9)) lineTime = '早上'
    if ((hour == 16)) lineTime = '下午'
    if ((hour == 20)) lineTime = '晚上'
    return `${date}${lineTime}`
}

// 警告名單
const getEvent = async() => {

    try {
        pool = await sql.connect(config.sql)
        let sqlQueries = await utils.loadSqlQueries('empTemp')
        let list = await pool.request().query(sqlQueries.empTempUnion)
        let result = JSON.stringify(list.recordset).replace(/[{]/g, '【').replace(/[}]/g, '】').replace(/["\\]/g, '')
        if (!result) {
            result = '此時段無資料'
        }
        var options = {
            method: 'POST',
            uri: 'https://notify-api.line.me/api/notify',
            auth: {
                bearer: '7rw4YPoeIx5dgJg5mAduZSeuhXfzkzyRbd64yVgHGWE',
            },
            form: {
                message: `${formatDate(new Date())}` + result,
            },
            json: true,
        }
        rp(options)
            .then(function(parsedBody) {
                console.log('發送成功')
            })
            .catch(function(err) {
                console.log(err)
            })
        res.send(options.form)
            // return list.recordset
    } catch (error) {
        console.log(error.message)
    } finally {
        pool.close()
    }
}


schedule.scheduleJob({ hour: 09, minute: 00 }, getEvent)
schedule.scheduleJob({ hour: 16, minute: 30 }, getEvent)
schedule.scheduleJob({ hour: 20, minute: 30 }, getEvent)




// 發燒名單
const getEventByID = async(CardNo, temp) => {
    try {
        pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('empTemp')
        let list = await pool.request().input('CardNo', sql.VarChar(100), CardNo).query(sqlQueries.empTempByID)
        let rows = JSON.stringify(list.recordset).replace(/[{]/g, '').replace(/[}]/g, '').replace(/[]]/g, '').replace(/["\\]/g, '')
        var options = {
            method: 'POST',
            uri: 'https://notify-api.line.me/api/notify',
            auth: {
                bearer: 'CPFL6Ga34AonzhEflKkTrSHTJscHgj423gRG1kbmB1l',
            },
            form: {
                message: rows + ` ,體溫:${temp}`,
            },
            json: true,
        }
        rp(options)
            .then(function(parsedBody) {
                console.log('發燒名單發送成功')
            })
            .catch(function(err) {
                console.log(err)
            })
        res.send(options.form)
    } catch (error) {
        console.log(error.message)
    } finally {
        pool.close()
    }
}
const getEventByDate = async() => {
    try {
        pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('empTemp')
        const list = await pool.request().query(sqlQueries.empTempByDate)
        return list.recordset
    } catch (error) {
        console.log(error.message)
    } finally {
        pool.close()
    }
}


module.exports = {
    getEvent,
    // getEvent1,
    getEventByDate,
    getEventByID,
}