'use strict';

const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {
    PORT,
    HOST,
    HOST_URL,
    SQL_USER,
    SQL_PASSWORD,
    SQL_DATABASE,
    SQL_SERVER,
    SQL_DATABASE_LIMS,
    SQL_SERVER_LIMS,
    SQL_USER_HRM,
    SQL_PASSWORD_HRM,
    SQL_DATABASE_HRM,
    SQL_SERVER_HRM,
} = process.env
const sqlEncrypt = process.env.SQL_ENCRYPT === 'true';

assert(PORT, 'PORT is require');
assert(HOST, 'HOST is required');

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    sql: {
        server: SQL_SERVER,
        database: SQL_DATABASE,
        user: SQL_USER,
        password: SQL_PASSWORD,
        options: {
            encrypt: sqlEncrypt,
            enableArithAbort: true,
        },
    },
    sql2: {
        server: SQL_SERVER_LIMS,
        database: SQL_DATABASE_LIMS,
        user: SQL_USER,
        password: SQL_PASSWORD,
        options: {
            encrypt: sqlEncrypt,
            enableArithAbort: true,
        },
    },
    sql_HRM: {
        server: SQL_SERVER_HRM,
        database: SQL_DATABASE_HRM,
        user: SQL_USER_HRM,
        password: SQL_PASSWORD_HRM,
        options: {
            encrypt: sqlEncrypt,
            enableArithAbort: true,
        },
    },
}