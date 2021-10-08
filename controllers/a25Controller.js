'use strict';
const a25Data = require('../data/a25data');


const getA25 = async (req, res, next) => {
    if (req.user.permission == 1 || req.user.permission == 3 || req.user.permission == 12) {
        try {
            // const rows = await a25Data.getA25Dcs();
            res.render('a25',{title:'A25 DATA'});
            // res.send({ 'result': rows });
            // console.log('The data from CH1ACI table: \n', rows);
        } catch (error) {
            res.status(400).send(error.message);
        }
    } else {
        res.sendFile(`${process.cwd()}/public/404.html`);
    }
};


const getA25Dcs = async (req, res, next) => {
    if (req.user.permission == 1 || req.user.permission == 3 || req.user.permission == 12) {
        try {
            const startDate = req.body.startDate;
            const endDate = req.body.endDate;
            const rows = await a25Data.getA25Dcs(startDate,endDate);
            // res.render('a25dcs',{title:'A25 DATA'});
            res.send(rows);

        } catch (error) {
            res.status(400).send(error.message);
        }
    } else {
        res.sendFile(`${process.cwd()}/public/404.html`);
    }
};




const getA25Dcs03 = async (req, res, next) => {
    if (req.user.permission == 1 || req.user.permission == 3 || req.user.permission == 12) {
        try {
            const startDate = req.body.startDate;
            const endDate = req.body.endDate;
            const rows = await a25Data.getA25Dcs03(startDate,endDate);
            // res.render('a25dcs03',{title:'A25 DATA'});
            res.send(rows);

        } catch (error) {
            res.status(400).send(error.message);
        }
    } else {
        res.sendFile(`${process.cwd()}/public/404.html`);
    }
};

const getA25Dcs03Filter = async (req, res, next) => {
    if (req.user.permission == 1 || req.user.permission == 3 || req.user.permission == 12) {
        try {
            const startDate = req.body.startDate;
            const endDate = req.body.endDate;
            const rows = await a25Data.getA25Dcs03Filter(startDate,endDate);
            // res.render('a25dcs03filter',{title:'A25 DATA'});
            res.send(rows);

        } catch (error) {
            res.status(400).send(error.message);
        }
    } else {
        res.sendFile(`${process.cwd()}/public/404.html`);
    }
};

const getA25Plc = async (req, res, next) => {
    if (req.user.permission == 1 || req.user.permission == 3 || req.user.permission == 12) {
        try {
            const startDate = req.body.startDate;
            const endDate = req.body.endDate;
            const rows = await a25Data.getA25Plc(startDate,endDate);
            // res.render('a25plc',{title:'A25 DATA'});
            res.send(rows);

        } catch (error) {
            res.status(400).send(error.message);
        }
    } else {
        res.sendFile(`${process.cwd()}/public/404.html`);
    }
};




// function getTrendLoop(rows) {
//     let newData = [], newA25TOC = [];
//     for (var i = 0; i < rows.length; i++) {
//         newData.push(rows[i].Date);
//         newA25TOC.push(rows[i].A25TOC);

//     }

//     let date = {
//         label: newData,
//         A25TOC: newA25TOC,
//     };
//     return date;

// }



// const getAllA25JSON = async (req, res, next) => {
//     try {
//         // 7天
//         let rows = await a25Data.getA25JSONSeven();

//         // 30天
//         let rows30 = await a25Data.getA25JSONThirty();

//         // perHour
//         let rows24 = await a25Data.getA25JSONperHour();
//         // perMinute
//         let rows1440 = await a25Data.getA25JSONperMinute();

//         let date7 = getTrendLoop(rows);
//         let date30 = getTrendLoop(rows30);
//         let date24 = getTrendLoop(rows24);
//         let date1440 = getTrendLoop(rows1440);

//         res.send({
//             'dates': {
//                 '7days': { 'data': date7 },
//                 '30days': { 'data': date30 },
//                 '24hours': { 'data': date24 },
//                 'perMins': { 'data': date1440 }
//             }
//         });

//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// };





const getA25ByDate = async (req, res, next) => {
    try {
        // const sacidStartDate = req.params.startDate;
        let a25Schema = req.body.a25Schema;
        console.log(a25Schema);
        let a25StartDate = req.body.startDate;
        console.log(a25StartDate);
        let a25EndDate = req.body.endDate;
        console.log(a25EndDate);
        const rows = await a25Data.getByDate(a25Schema,a25StartDate, a25EndDate);
        res.send(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
};


const getA25ById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const rows = await a25Data.getById(id);
        // res.render('sacid', { rows });
        res.send(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
};




module.exports = {
    getA25Dcs,
    getA25,
    getA25Dcs03,
    getA25Plc,
    getA25Dcs03Filter,
    // getAllA25JSON,
    getA25ByDate,
    getA25ById
};
