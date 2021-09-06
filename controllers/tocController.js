'use strict';
const tocData = require('../data/toc');


const getAllToc = async (req, res, next) => {
    if (req.user.permission == 1 || req.user.permission == 6) {
        try {
            const rows = await tocData.getToc();
            res.render('toc', { rows,title:"A25水質" });
            // console.log('The data from CH1ACI table: \n', rows);
        } catch (error) {
            res.status(400).send(error.message);
        }
    } else {
        res.sendFile(`${process.cwd()}/public/404.html`)
    }
}


const getAllTocJSON = async (req, res, next) => {
    try {
        // 7天
        let rows = await tocData.getTocJSONSeven();

        // 30天
        let rows30 = await tocData.getTocJSONThirty();

        let newData = [];
        let newA25Toc = [];
       


        for (let i = 0; i < rows.length; i++) {
            // let newRows = rows[i].Date;
            newData.push(rows[i].Date);
            newA25Toc.push(rows[i].A25TOC);
           
        }

        let date = {
            label: newData,
            A25TOC: newA25Toc,
          
        }

        let newData_th = [];
        let newA25Toc_th = [];
      


        for (let i = 0; i < rows30.length; i++) {
            // let newRows = rows[i].Date;
            newData_th.push(rows30[i].Date);
            newA25Toc_th.push(rows30[i].A25TOC);
         
        }

        let date_th = {
            label: newData_th,
            A25TOC: newA25Toc_th,
           
        }


        res.send({ "dates": { "7days": { "data": date }, "30days": { "data": date_th } } });

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



const getTocByDate = async (req, res, next) => {
    try {
        // const sacidStartDate = req.params.startDate;
        const TocStartDate = req.body.startDate;
        console.log(TocStartDate + new Date());
        const TocEndDate = req.body.endDate;
        console.log(TocEndDate);

        const rows = await tocData.getByDate(TocStartDate, TocEndDate);
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
    getAllToc,
    getAllTocJSON,
    // getN2R,
    getTocByDate,
    // exportSacid,
    // addEvent,
    // updateEvent,
    // deleteEvent
}
