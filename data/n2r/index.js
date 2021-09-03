'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');


let pool;
const getN2R = async () => {
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('n2r');
        const list = await pool.request().query(sqlQueries.n2rList);
        return list.recordset;
    } catch (error) {
        console.log(error.message);
    } finally {
        pool.close();
    }
}


const getN2RJSONSeven = async () => {
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('n2r');
        var list = await pool.request().query(sqlQueries.n2rChart7);
        return list.recordset;
    } catch (error) {
        console.log(error.message);
    } finally {
        pool.close();
    }
}

const getN2RJSONThirty = async () => {
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('n2r');
        var list = await pool.request().query(sqlQueries.n2rChart30);
        return list.recordset;
    } catch (error) {
        console.log(error.message);
    } finally {
        pool.close();
    }
}



const getById = async (BID) => {
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('n2r');
        const list = await pool.request()
        .input('BID',sql.Int, BID)
        .query(sqlQueries.n2rbyId);
        return list.recordset;
    } catch (error) {
        return error.message;
    } finally {
        pool.close();
    }
}




const getByDate = async (startDate, endDate) => {
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('n2r');
        const event = await pool.request()
            .input('startDate', sql.Date, startDate)
            .input('endDate', sql.Date, endDate)
            .query(sqlQueries.n2rbyDate);
        return event.recordset;
    } catch (error) {
        return error.message;
    } finally {
        pool.close();
    }
}


const getByDateReport = async (startDate, endDate) => {
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('n2r');
        const event = await pool.request()
            .input('startDate', sql.Date, startDate)
            .input('endDate', sql.Date, endDate)
            .query(sqlQueries.n2rbyDateReport);
        return event.recordset;
    } catch (error) {
        return error.message;
    } finally {
        pool.close();
    }
}





module.exports = {
    getN2R,
    getN2RJSONSeven,
    getN2RJSONThirty,
    getByDate,
    getByDateReport,
    getById,

}