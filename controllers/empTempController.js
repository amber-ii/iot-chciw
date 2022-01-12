// 'use strict'
const Data = require('../data/empTemp')
const rp = require('request-promise');
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt:web.chciw.com.tw')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; //必要阿沒加的話賴收不到


client.on('connect', function() {
    client.subscribe('TCM', function(err) {
        if (!err) {
            // console.log('連線到broker. Topic: TCM')
        }
    })
})

client.on('message', function(topic, message) {
    // message is Buffer
    var rcmsg = message.toString().replace('}', '')
    var mscidx = rcmsg.indexOf('"')
    var cardidx = rcmsg.indexOf('/')
    var valuidx = rcmsg.indexOf(':')
    var CardNo
    if (mscidx > -1 && cardidx > -1 && valuidx > -1) {
        var msc = rcmsg.split('"')[1].split('/')[0]
        CardNo = rcmsg.split('"')[1].split('/')[1]
        var temp = rcmsg.split(':')[1]
    }
    if(temp>=37){
        Data.getEventByID(CardNo, temp)
    }
})

function formatDate(now) {
    let date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()
    return date
}

const getAll = async(req, res, next) => {
    if (req.user.permission == 1) {
        try {
            let rows = await Data.getEvent()
            rows = await JSON.stringify(rows).replace(/[{]/g, '【').replace(/[}]/g, '】').replace(/["\\]/g, '')
            

           
            console.log("🚀 ~ file: empTempController.js ~ line 16 ~ getAll ~ rows", rows)
            res.send(rows)
            var options = {
                method: 'POST',
                uri: 'https://notify-api.line.me/api/notify',
                auth: {
                    bearer: '7rw4YPoeIx5dgJg5mAduZSeuhXfzkzyRbd64yVgHGWE',
                },
                form: {
                    message: `${formatDate(new Date())} ` + rows,
                },
                json: true,
            }
            rp(options)
                .then(function(parsedBody) {
                    console.log('發送成功')
                })
                .catch(function(err) {
                    console.log(err)
                })
            res.send(options.form)
        } catch (error) {
            res.status(400).send(error.message)
        }
    } else {
        res.sendFile(`${process.cwd()}/public/404.html`)
    }
}

const getByDate = async(req, res, next) => {
    if (req.user.permission == 1) {
        try {
            let rows = await Data.getEventByDate()

        } catch (error) {
            res.status(400).send(error.message)
        }
    } else {
        res.sendFile(`${process.cwd()}/public/404.html`)
    }
}


// const getByID = async(req, res, next) => {
//     if (req.user.permission == 1) {
//         try {
//             const CardNo = req.body.CardNo
//                 // const temp = req.body.temp
//             let rows = await Data.getEventByID(CardNo)
//             rows = await JSON.stringify(rows)
//             rows = await rows.replace('[', '').replace(']', '').replaceAll('"', '').replaceAll('{', '【').replaceAll('}', '】')
//             console.log('🚀 ~ file: empTempController.js ~ line 61 ~ getAll ~ rows', rows)
//             var options = {
//                 method: 'POST',
//                 uri: 'https://notify-api.line.me/api/notify',
//                 auth: {
//                     bearer: 'CPFL6Ga34AonzhEflKkTrSHTJscHgj423gRG1kbmB1l',
//                 },
//                 form: {
//                     message: rows,
//                 },
//                 json: true,
//             }
//             rp(options)
//                 .then(function(parsedBody) {
//                     console.log('發送成功')
//                 })
//                 .catch(function(err) {
//                     console.log(err)
//                 })
//             res.send(options.form)
//         } catch (error) {
//             res.status(400).send(error.message)
//         }
//     } else {
//         res.sendFile(`${process.cwd()}/public/404.html`)
//     }
// }


module.exports = {
    getAll,
    getByDate,
    // getByID,
}