'use strict'
const n2rData = require('../data/n2r')
const mqtt = require('mqtt')
const { set } = require('mongoose')
const client = mqtt.connect('mqtt:web.chciw.com.tw')
const lineNotify = require('line-notify-nodejs')('uLpuCfK2wZUKcy69M4AiQKrwk0SMqwhCMG07nAG1f8x')

// 預設查詢七天
const getAllN2R = async(req, res, next) => {
    if (req.user.permission == 1 || req.user.permission == 5 || req.user.permission == 4) {
        try {
            const rows = await n2rData.getN2R()
            res.render('n2r', { rows, title: '氮氣' })
        } catch (error) {
            res.status(400).send(error.message)
        }
    } else {
        res.sendFile(`${process.cwd()}/public/404.html`)
    }
}

const getTrendLoop = (rows) => {
    let newData = [],
        newA3t1 = [],
        newA3t2 = [],
        newA4t1 = [],
        newA8t1 = [],
        newA16t1 = []
    for (let i = 0; i < rows.length; i++) {
        newData.push(rows[i].Date)
        newA3t1.push(rows[i].a3t1)
        newA3t2.push(rows[i].a3t2)
        newA4t1.push(rows[i].a4t1)
        newA8t1.push(rows[i].a8t1)
        newA16t1.push(rows[i].a16t1)
    }
    let date = {
        label: newData,
        a3t1: newA3t1,
        a3t2: newA3t2,
        a4t1: newA4t1,
        a8t1: newA8t1,
        a16t1: newA16t1,
    }
    return date
}

const getAllN2RJSON = async(req, res, next) => {
    try {
        // 7天
        let rows0 = await n2rData.getN2RJSONSeven()
            // 30天
        let rows1 = await n2rData.getN2RJSONThirty()
        let date7 = getTrendLoop(rows0)
        let date30 = getTrendLoop(rows1)
        res.send({
            dates: {
                '7days': { data: date7 },
                '30days': { data: date30 },
            },
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

// 報表依日期查詢
const getN2RByDate = async(req, res, next) => {
    try {
        const n2rStartDate = req.body.startDate
        const n2rEndDate = req.body.endDate
        const rows = await n2rData.getByDate(n2rStartDate, n2rEndDate)
        res.send(rows)
    } catch (error) {
        res.status(400).send(error.message)
    }
}


client.on('connect', function() {
    client.subscribe('N2Rerr', function(err) {
        if (!err) {
            // console.log('連線到broker. Topic: TCM')
        }
    })
})

client.on('message', function(topic, message) {
    // message is Buffer
    let n2r = `A3F1, A3T1, A3F2, A3T2, A4F1, A4T1, A8F1, A8T1, A16F1, A16T1, A2F1,A2T1`
    let arr1 = new Set()
    let arr2 = new Set()
    let arr3 = new Set()
    let arr4 = new Set()
    var msg = JSON.parse(message)
    for (var key in msg) {
        if (key == 'A3F1') {
            arr1.add(key)
        }
        if (key == 'A3F2') {
            arr1.add(key)
        }
        if (key == 'A4F1') {
            arr1.add(key)
        }
        if (key == 'A8F1') {
            arr2.add(key)
        }
        if (key == 'A16F1') {
            arr3.add(key)
        }
        if (key == 'A2F1') {
            arr4.add(key)
        }
    }

})

// function callLine(key) {
//     lineNotify
//         .notify({
//             message: `氮氣${key}斷線`,
//         })
//         .then(() => {
//             console.log('n2r send completed!')
//         })
// }


module.exports = {
    getAllN2R,
    getAllN2RJSON,
    getN2RByDate,
}