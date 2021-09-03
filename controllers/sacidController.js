'use strict';
const sacidData = require('../data/sacid');


const getAllSacid = async (req, res, next) => {

    if (req.user.permission == 1 || req.user.permission == 3) {
        try {
            const rows = await sacidData.getSacid();
            res.render('sacid', { rows,title:"硫酸" });
            // console.log('The data from CH1ACI table: \n', rows);
        } catch (error) {
            res.status(400).send(error.message);
        }
    } else {
        res.sendFile(`${process.cwd()}/public/404.html`)
        // res.send(`權限不足`)
    }
}



// 8/23
const getAllSacidJSON = async (req, res, next) => {
    try {
        // 7天
        let rows = await sacidData.getSacidJSONSeven();

        // 30天
        let rows30 = await sacidData.getSacidSONThirty();

        let newData = [];
        let newA9Diff = [];
        let newA10Diff1 = [];
        let newA10Diff4 = [];
        let newTotal = [];
        let newA10Diff2 = [];
        let newA10Diff3 = [];
        let newDiff32 = [];


        for (let i = 0; i < rows.length; i++) {
            // let newRows = rows[i].Date;
            newData.push(`${rows[i].preDate}-${rows[i].Date}`);
            newA9Diff.push(rows[i].A9Diff);
            newA10Diff1.push(rows[i].A10Diff1);
            newA10Diff4.push(rows[i].A10Diff4);
            newTotal.push(rows[i].total);
            newA10Diff2.push(rows[i].A10Diff2);
            newA10Diff3.push(rows[i].A10Diff3);
            newDiff32.push(rows[i].diff32);
            // console.log(newData[i]);
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
        }

        let newData_th = [];
        let newA9Diff_th = [];
        let newA10Diff1_th = [];
        let newA10Diff4_th = [];
        let newTotal_th = [];
        let newA10Diff2_th = [];
        let newA10Diff3_th = [];
        let newDiff32_th = [];


        for (let i = 0; i < rows30.length; i++) {
            // let newRows = rows[i].Date;
            newData_th.push(`${rows30[i].preDate}-${rows30[i].Date}`);
            newA9Diff_th.push(rows30[i].A9Diff);
            newA10Diff1_th.push(rows30[i].A10Diff1);
            newA10Diff4_th.push(rows30[i].A10Diff4);
            newTotal_th.push(rows30[i].total);
            newA10Diff2_th.push(rows30[i].A10Diff2);
            newA10Diff3_th.push(rows30[i].A10Diff3);
            newDiff32_th.push(rows30[i].diff32);
            // console.log(newData_th);
        }

        let date_th = {
            label: newData_th,
            A9Diff: newA9Diff_th,
            A10Diff1: newA10Diff1_th,
            A10Diff4: newA10Diff4_th,
            total: newTotal_th,
            A10Diff2: newA10Diff2_th,
            A10Diff3: newA10Diff3_th,
            diff32: newDiff32_th
        }


        res.send({ "dates": { "7days": { "data": date }, "30days": { "data": date_th } } });

    } catch (error) {
        res.status(400).send(error.message);
    }
}


const getSacid = async (req, res, next) => {
    try {
        const BID = req.params.BID;
        const rows = await sacidData.getById(BID);
        // res.render('sacid', { rows });
        res.send(rows)
    } catch (error) {
        res.status(400).send(error.message);
    }
}



const getSacidByDate = async (req, res, next) => {
    try {
        // const sacidStartDate = req.params.startDate;
        const sacidStartDate = req.body.startDate;
        console.log(sacidStartDate + new Date());
        const sacidEndDate = req.body.endDate;
        console.log(sacidEndDate);

        const rows = await sacidData.getByDate(sacidStartDate, sacidEndDate);
        // res.render('sacid', { rows });
        res.send(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
}


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





// const exportSacid = async (req, res, next) => {
//     const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
//     const EXCEL_EXTENSION = '.xlsx'
//     try {
//         const sacidStartDate = req.body.startDate;
//         console.log("印出報表:" + sacidStartDate + new Date());
//         const sacidEndDate = req.body.endDate;
//         console.log("印出報表:" + sacidEndDate);
//         let fileName = `A9A10硫酸報表`;
//         let data = await sacidData.getByDateReport(sacidStartDate, sacidEndDate);


//         const worksheet = xlsx.utils.sheet_to_json(data)
//         const workbook = {
//             Sheet: {
//                 'data': worksheet
//             },
//             SheetNames: ['data']
//         };

//         const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
//         console.log(excelBuffer);
//         const datas = new Blob([buffer], { type: EXCEL_TYPE })
//         saveAs(datas, 'myFile' + EXCEL_EXTENSION);

//     } catch (error) {
//         res.status(400).send(error.message);
//     }


// }

// const exportSacid = async (req, res, next) => {
//     try {
//         const sacidStartDate = req.body.startDate;
//         console.log("印出報表:" + sacidStartDate + new Date());
//         const sacidEndDate = req.body.endDate;
//         console.log("印出報表:" + sacidEndDate);
//         let fileName = `A9A10硫酸報表_${sacidStartDate}-${sacidEndDate}`;
//         let rows = await sacidData.getByDateReport(sacidStartDate, sacidEndDate);



//         const dataRows = xlsx.utils.sheet_to_csv(rows);
//         console.log(dataRows);
//         // const workSheetData = []
//         // xlsx.utils.book_append_sheet(workBook, workSheet, fileName);
//         xlsx.writeFile(dataRows, path.resolve(`./${fileName}`));

//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }



// const exportSacid = async (req, res, next) => {
//     try {
//         const sacidStartDate = req.body.startDate;
//         console.log("印出報表:" + sacidStartDate + new Date());
//         const sacidEndDate = req.body.endDate;
//         console.log("印出報表:" + sacidEndDate);
//         let fileName = `A9A10硫酸報表_${sacidStartDate}-${sacidEndDate}.csv`;
//         // if (sacidStartDate == null) { //這段希望可以拿掉 用阿賈克斯取代
//         //     let rows_seven = await sacidData.getSacid();
//         //     csv = new ObjectsToCsv(rows_seven);
//         // } else {
//             let rows = await sacidData.getByDateReport(sacidStartDate, sacidEndDate);
//             let csv = await new ObjectsToCsv(rows);
//             await csv.toDisk(`./${fileName}`);
//             console.log(csv.toString());
//             res.send("okok");
//         // }
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }


const addEvent = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await sacidData.creatEvent(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateEvent = async (req, res, next) => {
    try {
        const eventId = req.params.id;
        const data = req.body;
        const updated = await sacidData.updateEvent(eventId, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteEvent = async (req, res, next) => {
    try {
        const eventId = req.params.id;
        const deletedEvent = await sacidData.deleteEvent(eventId);
        res.send(deletedEvent);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllSacid,
    getAllSacidJSON,
    getSacid,
    getSacidByDate,
    // exportSacid,
    addEvent,
    updateEvent,
    deleteEvent
}
