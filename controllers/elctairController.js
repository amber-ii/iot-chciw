'use strict';
const elctairData = require('../data/elctair');

const getTrendLoop = (rows) => {
    let newData = [], newA22 = [], newA23 = [];
    for (let i = 0; i < rows.length; i++) {
        newData.push(rows[i].Date);
        newA22.push(rows[i].A22);
        newA23.push(rows[i].A23);
    }
    let date = {
        label: newData,
        A22溫度: newA22,
        A23溫度: newA23,
    };
    return date;
};



const getAllElctAirJSON = async (req, res, next) => {
    try {
        // 7天
        let rows = await elctairData.getElctAirJSONSeven();
        // 30天
        let rows30 = await elctairData.getElctAirJSONThirty();
        let date7 = getTrendLoop(rows);
        let date30 = getTrendLoop(rows30);
        res.send({
            'dates': {
                '7days': { 'data': date7 },
                '30days': { 'data': date30 },
            }
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
};


module.exports = {
    getAllElctAirJSON,
};
