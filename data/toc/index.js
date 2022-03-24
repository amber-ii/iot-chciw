'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');


let pool;
const getToc = async () => {
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('toc');
        const list = await pool.request().query(sqlQueries.tocList);
        return list.recordset;
    } catch (error) {
        console.log(error.message);
    } finally {
        pool.close();
    }
};


const getTocJSONSeven = async () => {
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('toc');
        var list = await pool.request().query(sqlQueries.tocChart7);
        return list.recordset;
    } catch (error) {
        console.log(error.message);
    } finally {
        pool.close();
    }
};

const getTocJSONThirty = async () => {
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('toc');
        var list = await pool.request().query(sqlQueries.tocChart30);
        return list.recordset;
    } catch (error) {
        console.log(error.message);
    } finally {
        pool.close();
    }
};


const getTocJSONperHour = async () => {
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('toc');
        var list = await pool.request().query(sqlQueries.tocChart24);
        return list.recordset;
    } catch (error) {
        console.log(error.message);
    } finally {
        pool.close();
    }
};


const getTocJSONperMinute = async () => {
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('toc');
        var list = await pool.request().query(sqlQueries.tocChart1440);
        return list.recordset;
    } catch (error) {
        console.log(error.message);
    } finally {
        pool.close();
    }
};





// const getById = async (BID) => {
//     try {
//         pool = await sql.connect(config.sql);
//         const sqlQueries = await utils.loadSqlQueries('toc');
//         const list = await pool.request()
//         .input('BID',sql.Int, BID)
//         .query(sqlQueries.TocbyId);
//         return list.recordset;
//     } catch (error) {
//         return error.message;
//     } finally {
//         pool.close();
//     }
// }




const getByDate = async (startDate, endDate, tocValue) => {
  try {
    pool = await sql.connect(config.sql)
    const sqlQueries = await utils.loadSqlQueries('toc')
    const event = await pool
      .request()
      .input('startDate', sql.Date, startDate)
      .input('endDate', sql.Date, endDate)
      .input('tocValue', sql.Float, tocValue)
      .query(sqlQueries.tocbyDate)
    return event.recordset
  } catch (error) {
    return error.message
  } finally {
    pool.close()
  }
}


const getByDateReport = async (startDate, endDate) => {
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('Toc');
        const event = await pool.request()
            .input('startDate', sql.Date, startDate)
            .input('endDate', sql.Date, endDate)
            .query(sqlQueries.TocbyDateReport);
        return event.recordset;
    } catch (error) {
        return error.message;
    } finally {
        pool.close();
    }
};





module.exports = {
    getToc,
    getTocJSONSeven,
    getTocJSONThirty,
    getByDate,
    getByDateReport,
    getTocJSONperHour,
    getTocJSONperMinute
    // getById,

};