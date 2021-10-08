'use strict';
const elctairData = require('../data/elctair');

function getTrendLoop(rows) {
    let newData = [], newA22 = [],newA23 = [];
    for (var i = 0; i < rows.length; i++) {
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

}



const getAllElctAirJSON = async (req, res, next) => {
    try {
        // 7天
        let rows = await elctairData.getElctAirJSONSeven();

        // 30天
        let rows30 = await elctairData.getElctAirJSONThirty();

        // perHour
        // let rows24 = await elctairData.getTocJSONperHour();
        // perMinute
        // let rows1440 = await elctairData.getTocJSONperMinute();

        let date7 = getTrendLoop(rows);
        let date30 = getTrendLoop(rows30);
        // let date24 = getTrendLoop(rows24);
        // let date1440 = getTrendLoop(rows1440);

        res.send({
            'dates': {
                '7days': { 'data': date7 },
                '30days': { 'data': date30 },
                // '24hours': { 'data': date24 },
                // 'perMins': { 'data': date1440 }
            }
        });

    } catch (error) {
        res.status(400).send(error.message);
    }
};




module.exports = {
    getAllElctAirJSON,
};
