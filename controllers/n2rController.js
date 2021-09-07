'use strict';
const n2rData = require('../data/n2r');

const getAllN2R = async (req, res, next) => {
    if (req.user.permission == 1 || req.user.permission == 5) {
        try {
            const rows = await n2rData.getN2R();
            res.render('n2r', { rows, title: "氮氣" });
            // console.log('The data from CH1ACI table: \n', rows);
        } catch (error) {
            res.status(400).send(error.message);
        }
    } else {
        res.sendFile(`${process.cwd()}/public/404.html`)
    }
}


function getTrendLoop(rows) {

    let newData = [], newA3t1 = [], newA3t2 = [], newA4t1 = [], newA8t1 = [], newA16t1 = [];

    for (let i = 0; i < rows.length; i++) {
        // let newRows = rows[i].Date;
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
    }
    return date;

}



const getAllN2RJSON = async (req, res, next) => {
    try {
        // 7天
        let rows0 = await n2rData.getN2RJSONSeven();
        // 30天
        let rows1 = await n2rData.getN2RJSONThirty();
        let date7 = getTrendLoop(rows0);
        let date30 = getTrendLoop(rows1);
        res.send({ "dates": { "7days": { "data": date7 }, "30days": { "data": date30 } } });
    } catch (error) {
        res.status(400).send(error.message);
    }
}


// const getN2R = async (req, res, next) => {
//     try {
//         const BID = req.params.BID;
//         const rows = await sacidData.getById(BID);
//         // res.render('sacid', { rows });
//         res.send(rows)
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }



const getN2RByDate = async (req, res, next) => {
    try {
        // const sacidStartDate = req.params.startDate;
        const n2rStartDate = req.body.startDate;
        console.log(n2rStartDate + new Date());
        const n2rEndDate = req.body.endDate;
        console.log(n2rEndDate);

        const rows = await n2rData.getByDate(n2rStartDate, n2rEndDate);
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


// const addEvent = async (req, res, next) => {
//     try {
//         const data = req.body;
//         const insert = await sacidData.creatEvent(data);
//         res.send(insert);
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// const updateEvent = async (req, res, next) => {
//     try {
//         const eventId = req.params.id;
//         const data = req.body;
//         const updated = await sacidData.updateEvent(eventId, data);
//         res.send(updated);
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// const deleteEvent = async (req, res, next) => {
//     try {
//         const eventId = req.params.id;
//         const deletedEvent = await sacidData.deleteEvent(eventId);
//         res.send(deletedEvent);
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

module.exports = {
    getAllN2R,
    getAllN2RJSON,
    // getN2R,
    getN2RByDate,
    // exportSacid,
    // addEvent,
    // updateEvent,
    // deleteEvent
}
