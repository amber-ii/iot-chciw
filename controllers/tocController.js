'use strict';
const tocData = require('../data/toc');


const getAllToc = async(req, res, next) => {
    if (req.user.permission == 1 || req.user.permission == 3 || req.user.permission == 4) {
        try {
            const rows = await tocData.getToc()
            res.send(rows)
        } catch (error) {
            res.status(400).send(error.message)
        }
    } else {
        res.sendFile(`${process.cwd()}/public/404.html`)
    }
};




function getTrendLoop(rows) {
    let newData = [],
        newA25TOC = [];
    for (var i = 0; i < rows.length; i++) {
        newData.push(rows[i].Date);
        newA25TOC.push(rows[i].A25TOC);

    }

    let date = {
        label: newData,
        A25TOC: newA25TOC,
    };
    return date;

}



const getTocChart = async(req, res, next) => {
    try {
        // 7天
        let rows = await tocData.getTocJSONSeven();

        // 30天
        let rows30 = await tocData.getTocJSONThirty();

        // perHour
        let rows24 = await tocData.getTocJSONperHour();
        // perMinute
        let rows1440 = await tocData.getTocJSONperMinute();

        let date7 = getTrendLoop(rows);
        let date30 = getTrendLoop(rows30);
        let date24 = getTrendLoop(rows24);
        let date1440 = getTrendLoop(rows1440);

        res.send({
            'dates': {
                '7days': { 'data': date7 },
                '30days': { 'data': date30 },
                '24hours': { 'data': date24 },
                'perMins': { 'data': date1440 }
            }
        });

    } catch (error) {
        res.status(400).send(error.message);
    }
};



const getTocByDate = async(req, res, next) => {
    try {
        let TocStartDate = req.body.startDate;
        let TocEndDate = req.body.endDate;
        let tocValue = req.body.tocValue
        if (!tocValue) {
            tocValue = null
        }
        const rows = await tocData.getByDate(TocStartDate, TocEndDate, tocValue)
        res.send(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
  getAllToc,
  getTocChart,
  getTocByDate,
}