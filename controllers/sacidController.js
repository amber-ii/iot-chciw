'use strict';
const sacidData = require('../data/sacid');

// 報表預設七天
const getAllSacid = async(req, res, next) => {

    if (req.user.permission == 1 || req.user.permission == 3 || req.user.permission == 4) {
        try {
            const rows = await sacidData.getSacid()
            res.send(rows)
        } catch (error) {
            res.status(400).send(error.message)
        }
    } else {
        res.sendFile(`${process.cwd()}/public/404.html`)
    }
};


const getTrendLoop = (rows) => {
    let newData = [],
        newA9Diff = [],
        newA10Diff1 = [],
        newA10Diff4 = [],
        newTotal = [],
        newA10Diff2 = [],
        newA10Diff3 = [],
        newDiff32 = [];
    for (let i = 0; i < rows.length; i++) {
        newData.push(`${rows[i].preDate}-${rows[i].Date}`);
        newA9Diff.push(rows[i].A9Diff);
        newA10Diff1.push(rows[i].A10Diff1);
        newA10Diff4.push(rows[i].A10Diff4);
        newTotal.push(rows[i].total);
        newA10Diff2.push(rows[i].A10Diff2);
        newA10Diff3.push(rows[i].A10Diff3);
        newDiff32.push(rows[i].diff32);
    }
    let date = {
        label: newData,
        A9Diff: newA9Diff,
        A10Diff1: newA10Diff1,
        A10Diff4: newA10Diff4,
        total: newTotal,
        A10Diff2: newA10Diff2,
        A10Diff3: newA10Diff3,
        diff32: newDiff32
    };
    return date;
};


const getSacidChart = async(req, res, next) => {
    try {
        // 7天
        let rows0 = await sacidData.getSacidJSONSeven();
        // 30天
        let rows1 = await sacidData.getSacidSONThirty();
        let date7 = getTrendLoop(rows0);
        let date30 = getTrendLoop(rows1);
        res.send({
            'dates': {
                '7days': { 'data': date7 },
                '30days': { 'data': date30 }
            }
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
};





// 依日期查詢
const getSacidByDate = async(req, res, next) => {
    try {
        const sacidStartDate = req.body.startDate;
        console.log(sacidStartDate + new Date());
        const sacidEndDate = req.body.endDate;
        console.log(sacidEndDate);

        const rows = await sacidData.getByDate(sacidStartDate, sacidEndDate);
        res.send(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
};




module.exports = {
  getAllSacid,
  getSacidChart,
  getSacidByDate,
}