'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');


let pool;


const getElctAirJSONSeven = async () => {
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('elctair');
        var list = await pool.request().query(sqlQueries.elctairChart7);
        return list.recordset;
    } catch (error) {
        console.log(error.message);
    } finally {
        pool.close();
    }
};

const getElctAirJSONThirty = async () => {
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('elctair');
        var list = await pool.request().query(sqlQueries.elctairChart30);
        return list.recordset;
    } catch (error) {
        console.log(error.message);
    } finally {
        pool.close();
    }
};




module.exports = {
    getElctAirJSONSeven,
    getElctAirJSONThirty,
};