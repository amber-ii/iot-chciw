'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');


let pool;
const getA25Dcs = async (startDate, endDate) => {
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('a25data');
        const event = await pool.request()
            .input('startDate', sql.Date, startDate)
            .input('endDate', sql.Date, endDate)
            .query(sqlQueries.a25dcs);
        return event.recordset;
    } catch (error) {
        console.log(error.message);
    } finally {
        pool.close();
    }
};

const getA25Dcs03 = async (startDate, endDate) => {
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('a25data');
        const event = await pool.request()
            .input('startDate', sql.Date, startDate)
            .input('endDate', sql.Date, endDate)
            .query(sqlQueries.a25dcs03);
        return event.recordset;
    } catch (error) {
        console.log(error.message);
    } finally {
        pool.close();
    }
};

const getA25Dcs03Filter = async (startDate, endDate) => {
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('a25data');
        const event = await pool.request()
            .input('startDate', sql.Date, startDate)
            .input('endDate', sql.Date, endDate)
            .query(sqlQueries.a25dcs03filter);
        return event.recordset;
    } catch (error) {
        console.log(error.message);
    } finally {
        pool.close();
    }
};

const getA25Plc = async (startDate, endDate) => {
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('a25data');
        const event = await pool.request()
            .input('startDate', sql.Date, startDate)
            .input('endDate', sql.Date, endDate)
            .query(sqlQueries.a25plc);
        return event.recordset;
    } catch (error) {
        console.log(error.message);
    } finally {
        pool.close();
    }
};



const getById = async (id) => {
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('a25data');
        const list = await pool.request().input('id', sql.Int, id).query(sqlQueries.a25byId);
        return list.recordset;
    } catch (error) {
        return error.message;
    } finally {
        pool.close();
    }
};




const getByDate = async (schema, startDate, endDate) => {
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('a25data');
        const event = await pool.request()
            .input('schema', sql.Text, schema)
            .input('startDate', sql.Date, startDate)
            .input('endDate', sql.Date, endDate)
            .query(sqlQueries.a25byDate);
        return event.recordset;
    } catch (error) {
        return error.message;
    } finally {
        pool.close();
    }
};






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
    getById

};