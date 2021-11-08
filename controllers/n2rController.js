'use strict';
const n2rData = require('../data/n2r');

// 預設查詢七天
const getAllN2R = async (req, res, next) => {
    if (req.user.permission == 1 || req.user.permission == 5) {
        try {
            const rows = await n2rData.getN2R();
            res.render('n2r', { rows, title: '氮氣' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    } else {
        res.sendFile(`${process.cwd()}/public/404.html`);
    }
};


const getTrendLoop = (rows) => {
    let newData = [], newA3t1 = [], newA3t2 = [], newA4t1 = [], newA8t1 = [], newA16t1 = [];
    for (let i = 0; i < rows.length; i++) {
        newData.push(rows[i].Date);
        newA3t1.push(rows[i].a3t1);
        newA3t2.push(rows[i].a3t2);
        newA4t1.push(rows[i].a4t1);
        newA8t1.push(rows[i].a8t1);
        newA16t1.push(rows[i].a16t1);
    }
    let date = {
        label: newData,
        a3t1: newA3t1,
        a3t2: newA3t2,
        a4t1: newA4t1,
        a8t1: newA8t1,
        a16t1: newA16t1,
    };
    return date;
};



const getAllN2RJSON = async (req, res, next) => {
    try {
        // 7天
        let rows0 = await n2rData.getN2RJSONSeven();
        // 30天
        let rows1 = await n2rData.getN2RJSONThirty();
        let date7 = getTrendLoop(rows0);
        let date30 = getTrendLoop(rows1);
        res.send({
            'dates':
            {
                '7days':
                    { 'data': date7 },
                '30days':
                    { 'data': date30 }
            }
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// 報表依日期查詢
const getN2RByDate = async (req, res, next) => {
    try {
        const n2rStartDate = req.body.startDate;
        // console.log(n2rStartDate + new Date());
        const n2rEndDate = req.body.endDate;
        // console.log(n2rEndDate);
        const rows = await n2rData.getByDate(n2rStartDate, n2rEndDate);
        res.send(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
};


// 報表印出功能

// const exportSacid = async (req, res, next) => {
//     try {
//         const sacidStartDate = req.body.startDate;
//         console.log("印出報表:" + sacidStartDate + new Date());
//         const sacidEndDate = req.body.endDate;
//         console.log("印出報表:" + sacidEndDate);
//         let fileName = `A9A10硫酸報表`;
//         let data = await sacidData.getByDateReport(sacidStartDate, sacidEndDate);
//         data = JSON.stringify(data)
//         fs.writeFile(__dirname+'/test.xlsx', data, err => {
//           if (err) {
//             console.error(err)
//             return
//           }
//           //file written successfully
//         })

//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }


module.exports = {
    getAllN2R,
    getAllN2RJSON,
    getN2RByDate,
};
