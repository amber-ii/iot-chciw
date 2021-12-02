'use strict'
const utils = require('../utils')
const config = require('../../config')
const sql = require('mssql')

let pool
const getA25DcsNew = async(startDate, endDate, location, freq) => {
    try {
        var lo = ''
        let msg = ''
        for (let i = 0; i < location.length; i++) {
            lo += location[i] + ' ' + 'as' + ' ' + 'location' + i + ' ' + ','
        }
        if (freq == 'min') {
            msg = `SELECT ${lo} format([OPCUA_A25DCS_Device1_LocalDA_Device1_XV4508_3_MV__TIMESTAMP],'yyyy/MM/dd_HH:mm') as Date FROM [KEP].[dbo].[A25DCSDB] WHERE [OPCUA_A25DCS_Device1_LocalDA_Device1_XV4508_3_MV__TIMESTAMP] between '${startDate}' and DATEADD(day,1,'${endDate}') order by [OPCUA_A25DCS_Device1_LocalDA_Device1_XV4508_3_MV__TIMESTAMP] asc`
        }
        if (freq == 'hour') {
            msg = `SELECT ${lo} format([OPCUA_A25DCS_Device1_LocalDA_Device1_XV4508_3_MV__TIMESTAMP],'yyyy/MM/dd_HH:mm') as Date FROM [KEP].[dbo].[A25DCSDB] WHERE [OPCUA_A25DCS_Device1_LocalDA_Device1_XV4508_3_MV__TIMESTAMP] between '${startDate}' and DATEADD(day,1,'${endDate}') and [OPCUA_A25DCS_Device1_LocalDA_Device1_XV4508_3_MV__TIMESTAMP] LIKE '%:00%' order by [OPCUA_A25DCS_Device1_LocalDA_Device1_XV4508_3_MV__TIMESTAMP] asc`
        }
        console.log(msg)
        pool = await sql.connect(config.sql)

        const event = await pool.request().query(msg)
        return event.recordset
    } catch (error) {
        console.log(error.message)
    } finally {
        pool.close()
    }
}

const getA25Dcs03New = async(startDate, endDate, location, freq) => {
    try {
        var lo = ''
        let msg = ''
        for (let i = 0; i < location.length; i++) {
            lo += location[i] + ' ' + 'as' + ' ' + 'location' + i + ' ' + ','
        }
        if (freq == 'min') {
            msg = `SELECT ${lo} format([Time],'yyyy/MM/dd_HH:mm') as Date FROM [KEP].[dbo].[A2503DCS] WHERE [Time] between '${startDate}' and DATEADD(day,1,'${endDate}') order by [Time] asc`
        } else {
            msg = `SELECT ${lo} format([Time],'yyyy/MM/dd_HH:mm') as Date FROM [KEP].[dbo].[A2503DCS] WHERE [Time] between '${startDate}' and DATEADD(day,1,'${endDate}') and [Time] LIKE '%:00%'order by [Time] asc`
        }

        console.log(msg)
        pool = await sql.connect(config.sql)
        const event = await pool.request().query(msg)
        return event.recordset
    } catch (error) {
        console.log(error.message)
    } finally {
        pool.close()
    }
}

const getA25Dcs03FilterNew = async(startDate, endDate, location, freq) => {
    try {
        var lo = ''
        let msg = ''
        for (let i = 0; i < location.length; i++) {
            lo += location[i] + ' ' + 'as' + ' ' + 'location' + i + ' ' + ','
        }
        if (freq == 'min') {
            msg = `SELECT ${lo} format([OPCUA_A25DCS_25_3_Filter_1XV102F_MV__TIMESTAMP],'yyyy/MM/dd_HH:mm') as Date FROM [KEP].[dbo].[A2503DCSFILTER] WHERE [OPCUA_A25DCS_25_3_Filter_1XV102F_MV__TIMESTAMP] between '${startDate}' and DATEADD(day,1,'${endDate}') order by [OPCUA_A25DCS_25_3_Filter_1XV102F_MV__TIMESTAMP] asc`
        } else {
            msg = `SELECT ${lo} format([OPCUA_A25DCS_25_3_Filter_1XV102F_MV__TIMESTAMP],'yyyy/MM/dd_HH:mm') as Date FROM [KEP].[dbo].[A2503DCSFILTER] WHERE [OPCUA_A25DCS_25_3_Filter_1XV102F_MV__TIMESTAMP] between '${startDate}' and DATEADD(day,1,'${endDate}') and [OPCUA_A25DCS_25_3_Filter_1XV102F_MV__TIMESTAMP] LIKE '%:00%' order by [OPCUA_A25DCS_25_3_Filter_1XV102F_MV__TIMESTAMP] asc`
        }
        console.log(msg)
        pool = await sql.connect(config.sql)
        const event = await pool.request().query(msg)
        return event.recordset
    } catch (error) {
        console.log(error.message)
    } finally {
        pool.close()
    }
}

const getA25PlcNew = async(startDate, endDate, location, freq) => {
    try {
        var lo = ''
        let msg = ''
        for (let i = 0; i < location.length; i++) {
            lo += location[i] + ' ' + 'as' + ' ' + 'location' + i + ' ' + ','
        }
        if (freq == 'min') {
            msg = `SELECT ${lo} format([MBTCP_A25PLC_A25PLC_TT_402_TIMESTAMP],'yyyy/MM/dd_HH:mm') as Date FROM [KEP].[dbo].[A25PLCDB] WHERE [MBTCP_A25PLC_A25PLC_TT_402_TIMESTAMP] between '${startDate}' and DATEADD(day,1,'${endDate}') order by [MBTCP_A25PLC_A25PLC_TT_402_TIMESTAMP] asc`
        } else {
            msg = `SELECT ${lo} format([MBTCP_A25PLC_A25PLC_TT_402_TIMESTAMP],'yyyy/MM/dd_HH:mm') as Date FROM [KEP].[dbo].[A25PLCDB] WHERE [MBTCP_A25PLC_A25PLC_TT_402_TIMESTAMP] between '${startDate}' and DATEADD(day,1,'${endDate}') and [MBTCP_A25PLC_A25PLC_TT_402_TIMESTAMP] LIKE '%:00%' order by [MBTCP_A25PLC_A25PLC_TT_402_TIMESTAMP] asc`
        }

        console.log(msg)
        pool = await sql.connect(config.sql)
        const event = await pool.request().query(msg)
        return event.recordset
    } catch (error) {
        console.log(error.message)
    } finally {
        pool.close()
    }
}

const getA25AutoNew = async(startDate, endDate, location, freq) => {
    try {
        var lo = ''
        let msg = ''
        for (let i = 0; i < location.length; i++) {
            lo += '[' + location[i] + ']' + ' ' + 'as' + ' ' + 'location' + i + ' ' + ','
        }
        if (freq == 'min') {
            msg = `SELECT ${lo} format([Time],'yyyy/MM/dd_HH:mm') as Date FROM [KEP].[dbo].[AUTvsMAN] WHERE [Time] between '${startDate}' and DATEADD(day,1,'${endDate}') order by [Time] asc`
        } else {
            msg = `SELECT ${lo} format([Time],'yyyy/MM/dd_HH:mm') as Date FROM [KEP].[dbo].[AUTvsMAN] WHERE [Time] between '${startDate}' and DATEADD(day,1,'${endDate}') and [Time] LIKE '%:00%' order by [Time] asc`
        }

        console.log(msg)
        pool = await sql.connect(config.sql)
        const event = await pool.request().query(msg)
        return event.recordset
    } catch (error) {
        console.log(error.message)
    } finally {
        pool.close()
    }
}

// const getA25AutNew = async(startDate, endDate, location, freq) => {
//     try {
//         var lo = ''
//         let msg = ''
//         for (let i = 0; i < location.length; i++) {
//             lo += location[i] + ' ' + 'as' + ' ' + 'location' + i + ' ' + ','
//         }
//         if (freq == 'min') {
//             msg = `SELECT ${lo} format([Time],'yyyy/MM/dd_HH:mm') as Date FROM [KEP].[dbo].[AUTvsMAN] WHERE [Time] between '${startDate}' and DATEADD(day,1,'${endDate}') order by [Time] asc`
//         } else {
//             msg = `SELECT ${lo} format([Time],'yyyy/MM/dd_HH:mm') as Date FROM [KEP].[dbo].[AUTvsMAN] WHERE [Time] between '${startDate}' and DATEADD(day,1,'${endDate}') and [Time] LIKE '%:00%' order by [Time] asc`
//         }

//         console.log(msg)
//         pool = await sql.connect(config.sql)
//         const event = await pool.request().query(msg)
//         return event.recordset
//     } catch (error) {
//         console.log(error.message)
//     } finally {
//         pool.close()
//     }
// }

// const getA25DcsNew = async (startDate, endDate, location) => {
//     try {
//         pool = await sql.connect(config.sql);
//         const sqlQueries = await utils.loadSqlQueries('a25data');
//         const event = await pool.request()
//             .input('startDate', sql.Date, startDate)
//             .input('endDate', sql.Date, endDate)
//             .input('location', sql.VarChar(100), location)
//             .query(sqlQueries.a25dcsnew);
//         return event.recordset;
//     } catch (error) {
//         console.log(error.message);
//     } finally {
//         pool.close();
//     }
// };
const getA25Dcs = async(startDate, endDate) => {
    try {
        pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('a25data')
        const event = await pool.request().input('startDate', sql.Date, startDate).input('endDate', sql.Date, endDate).query(sqlQueries.a25dcs)
        return event.recordset
    } catch (error) {
        console.log(error.message)
    } finally {
        pool.close()
    }
}

const getA25Dcs03 = async(startDate, endDate) => {
    try {
        pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('a25data')
        const event = await pool.request().input('startDate', sql.Date, startDate).input('endDate', sql.Date, endDate).query(sqlQueries.a25dcs03)
        return event.recordset
    } catch (error) {
        console.log(error.message)
    } finally {
        pool.close()
    }
}

const getA25Dcs03Filter = async(startDate, endDate) => {
    try {
        pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('a25data')
        const event = await pool.request().input('startDate', sql.Date, startDate).input('endDate', sql.Date, endDate).query(sqlQueries.a25dcs03filter)
        return event.recordset
    } catch (error) {
        console.log(error.message)
    } finally {
        pool.close()
    }
}

const getA25Plc = async(startDate, endDate) => {
    try {
        pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('a25data')
        const event = await pool.request().input('startDate', sql.Date, startDate).input('endDate', sql.Date, endDate).query(sqlQueries.a25plc)
        return event.recordset
    } catch (error) {
        console.log(error.message)
    } finally {
        pool.close()
    }
}

const getById = async(id) => {
    try {
        pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('a25data')
        const list = await pool.request().input('id', sql.Int, id).query(sqlQueries.a25byId)
        return list.recordset
    } catch (error) {
        return error.message
    } finally {
        pool.close()
    }
}

const getByDate = async(schema, startDate, endDate) => {
    try {
        pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('a25data')
        const event = await pool
            .request()
            .input('schema', sql.Text, schema)
            .input('startDate', sql.Date, startDate)
            .input('endDate', sql.Date, endDate)
            .query(sqlQueries.a25byDate)
        return event.recordset
    } catch (error) {
        return error.message
    } finally {
        pool.close()
    }
}

const getA25DcsCol = async() => {
    try {
        pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('a25data')
        const event = await pool
            .request()

        .query(sqlQueries.a25dcsCol)
        return event.recordset
    } catch (error) {
        console.log(error.message)
    } finally {
        pool.close()
    }
}

const getA25Dcs03Col = async() => {
    try {
        pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('a25data')
        const event = await pool
            .request()

        .query(sqlQueries.a25dcs03Col)
        return event.recordset
    } catch (error) {
        console.log(error.message)
    } finally {
        pool.close()
    }
}

const getA25Dcs03FilterCol = async() => {
    try {
        pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('a25data')
        const event = await pool
            .request()

        .query(sqlQueries.a25dcs03FilterCol)
        return event.recordset
    } catch (error) {
        console.log(error.message)
    } finally {
        pool.close()
    }
}

const getA25PlcCol = async() => {
    try {
        pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('a25data')
        const event = await pool
            .request()

        .query(sqlQueries.a25plcCol)
        return event.recordset
    } catch (error) {
        console.log(error.message)
    } finally {
        pool.close()
    }
}

// const getA25JSONSeven = async () => {
//     try {
//         pool = await sql.connect(config.sql);
//         const sqlQueries = await utils.loadSqlQueries('a25data');
//         var list = await pool.request().query(sqlQueries.n2rChart7);
//         return list.recordset;
//     } catch (error) {
//         console.log(error.message);
//     } finally {
//         pool.close();
//     }
// };

// const getA25JSONThirty = async () => {
//     try {
//         pool = await sql.connect(config.sql);
//         const sqlQueries = await utils.loadSqlQueries('a25data');
//         var list = await pool.request().query(sqlQueries.n2rChart30);
//         return list.recordset;
//     } catch (error) {
//         console.log(error.message);
//     } finally {
//         pool.close();
//     }
// };

module.exports = {
    getA25Dcs,
    getA25Dcs03,
    getA25Dcs03Filter,
    getA25Plc,
    // getA25JSONSeven,
    // getA25JSONThirty,
    getByDate,
    getById,
    getA25DcsCol,
    getA25Dcs03Col,
    getA25Dcs03FilterCol,
    getA25PlcCol,
    getA25DcsNew,
    getA25Dcs03New,
    getA25Dcs03FilterNew,
    getA25PlcNew,
    getA25AutoNew,
}