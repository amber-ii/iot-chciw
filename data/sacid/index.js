'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');


let pool;
const getSacid = async () => {
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('sacid');
        const list = await pool.request().query(sqlQueries.sacidList);
        return list.recordset;
    } catch (error) {
        console.log(error.message);
    } finally {
        pool.close();
        console.log('connection close');
    }
};


const getSacidJSONSeven = async () => {
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('sacid');
        var list = await pool.request().query(sqlQueries.sacidChart7);
        return list.recordset;
    } catch (error) {
        console.log(error.message);
    } finally {
        pool.close();
        console.log('connection close');
    }
};

const getSacidSONThirty = async () => {
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('sacid');
        var list = await pool.request().query(sqlQueries.sacidChart30);
        return list.recordset;
    } catch (error) {
        console.log(error.message);
    } finally {
        pool.close();
        console.log('connection close');
    }
};


const getSacidJSONSixty = async () => {
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('sacid');
        var list = await pool.request().query(sqlQueries.sacidChart60);
        return list.recordset;
    } catch (error) {
        console.log(error.message);
    } finally {
        pool.close();
        console.log('connection close');
    }
};

const getById = async (BID) => {
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('sacid');
        const list = await pool.request().input('BID',sql.Int, BID).query(sqlQueries.sacidbyId);
        return list.recordset;
    } catch (error) {
        return error.message;
    } finally {
        pool.close();
        console.log('connection close');
    }
};




const getByDate = async (startDate, endDate) => {
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('sacid');
        const event = await pool.request()
            .input('startDate', sql.Date, startDate)
            .input('endDate', sql.Date, endDate)
            .query(sqlQueries.sacidbyDate);
        return event.recordset;
    } catch (error) {
        return error.message;
    } finally {
        pool.close();
        console.log('connection close');
    }
};


const getByDateReport = async (startDate, endDate) => {
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('sacid');
        const event = await pool.request()
            .input('startDate', sql.Date, startDate)
            .input('endDate', sql.Date, endDate)
            .query(sqlQueries.sacidbyDateReport);
        return event.recordset;
    } catch (error) {
        return error.message;
    } finally {
        pool.close();
        console.log('connection close');
    }
};

const creatEvent = async (eventdata) => {
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('sacid');
        const insertEvent = await pool.request()
            .input('eventTitle', sql.NVarChar(100), eventdata.eventTitle)
            .input('eventDescription', sql.NVarChar(1500), eventdata.eventDescription)
            .input('startDate', sql.Date, eventdata.startDate)
            .input('endDate', sql.Date, eventdata.endDate)
            .input('avenue', sql.NVarChar(200), eventdata.avenue)
            .input('maxMembers', sql.Int, eventdata.maxMembers)
            .query(sqlQueries.createEvent);
        return insertEvent.recordset;
    } catch (error) {
        return error.message;
    } finally {
        pool.close();
        console.log('connection close');
    }
};

const updateEvent = async (eventId, data) => {
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('sacid');
        const update = await pool.request()
            .input('eventId', sql.Int, eventId)
            .input('eventTitle', sql.NVarChar(100), data.eventTitle)
            .input('eventDescription', sql.NVarChar(1500), data.eventDescription)
            .input('startDate', sql.Date, data.startDate)
            .input('endDate', sql.Date, data.endDate)
            .input('avenue', sql.NVarChar(200), data.avenue)
            .input('maxMembers', sql.Int, data.maxMembers)
            .query(sqlQueries.updateEvent);
        return update.recordset;
    } catch (error) {
        return error.message;
    } finally {
        pool.close();
        console.log('connection close');
    }
};

const deleteEvent = async (eventId) => {
    try {
        pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('sacid');
        const deleteEvent = await pool.request()
            .input('eventId', sql.Int, eventId)
            .query(sqlQueries.deleteEvent);
        return deleteEvent.recordset;
    } catch (error) {
        return error.message;
    } finally {
        pool.close();
        console.log('connection close');
    }
};

module.exports = {
    getSacid,
    getSacidJSONSeven,
    getSacidSONThirty,
    getSacidJSONSixty,
    getByDate,
    getByDateReport,
    getById,
    creatEvent,
    updateEvent,
    deleteEvent
};