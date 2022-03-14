const mqtt = require('mqtt')
const client = mqtt.connect('mqtt:web.chciw.com.tw')
const lineNotify = require('line-notify-nodejs')('1CaJqyBCAj4QQszqUY5I7XG7nVCyFMo4qyETrTr4CFg')
const schedule = require('node-schedule')
const Modbus = require('./models/Modbus')
const moment = require('moment-timezone')
function callLine(content) {
    lineNotify
        .notify({
            message: '\n\n' + content,
        })
        .then(() => {
            console.log('send completed!')
        })
}


client.on('connect', async function() {
    await client.subscribe('A2Recorderr', function(err) {
        if (!err) {}
    })
    await client.subscribe('A2Record', function(err) {
        if (!err) {}
    })

    await client.subscribe('WPerr', function(err) {
        if (!err) {}
    })
    await client.subscribe('WaterProj', function(err) {
        if (!err) {}
    })

    await client.subscribe('AH2PHerr', function(err) {
        if (!err) {}
    })
    await client.subscribe('AH2PH', function(err) {
        if (!err) {}
    })

    await client.subscribe('CH1ACIerr', function(err) {
        if (!err) {}
    })
    await client.subscribe('CH1ACI', function(err) {
        if (!err) {}
    })

    await client.subscribe('A10VPCerr', function(err) {
        if (!err) {}
    })
    await client.subscribe('A10VPC', function(err) {
        if (!err) {}
    })

    await client.subscribe('N2Rerr', function(err) {
        if (!err) {}
    })
    await client.subscribe('N2R', function(err) {
            if (!err) {}
        })
        // 變電站溫度沒有err
    await client.subscribe('ElctAir', function(err) {
        if (!err) {}
    })
    await client.subscribe('A10HeatX', function(err) {
        if (!err) {}
    })
    await client.subscribe('A25TOCerr', function(err) {
        if (!err) {}
    })
    await client.subscribe('STMerr', function(err) {
        if (!err) {}
    })



})

// 斷線
let hasCall1, hasCall2, hasCall3, hasCall4, hasCall5, hasCall6


// A2監測
let is_A2W3PH, is_A2W3T, is_A2VP
    // 自來水
let is_Press, is_Sw, is_Fq
    // 硫酸
let is_A9F1p, is_A10F1p, is_A10F2p, is_A10F3p, is_A10F4p

// 氮氣
let is_A3T1, is_A3T2, is_A4T1, is_A8T1, is_A16T1, is_A2T1

// 蒸氣
let is_VP, is_CV
    // 變電站

let is_A22 = 0,
    is_A23 = 0


// 廢水池
let is_Flow, is_ph

// a10熱交換器
let is_Tch0, is_Tch1, is_Tch2, is_Tch3, is_Tch4, is_Tch5, is_Isw, is_Isp

schedule.scheduleJob({ hour: 11, minute: 00, second: 01 }, async() => {
    // is_A22 == -2 ? (is_A22 = 0) : false
    // is_A23 == -2 ? is_A23 = 0 : false


})





client.on('message', function(topic, message) {
    var msg = JSON.parse(message)
    for (var key in msg) {

        if (topic.includes('err') && msg[key] == 0) {
            const postModbus = new Modbus({
                topic: topic,
                tag: message,
                breakDate: moment().utcOffset('+16:00').format('YYYY/MM/DD HH:mm:ss'),
            })
            postModbus.save()
        }
        // if (msg[key] == 0) {
        //     if (topic == 'A2Recorderr') {
        //         const postModbus = new Modbus({
        //             topic: topic,
        //             tag: message,
        //             breakDate: moment().utcOffset('+16:00').format('YYYY/MM/DD HH:mm:ss')
        //         })
        //         postModbus.save()
        //         hasCall1++

        //         if (hasCall1 == 10) {
        //             callLine('A2監控' + '\n\n' + message)
        //             hasCall1++
        //         }
        //     }
        //     if (topic == 'WPerr') {
        //         const postModbus = new Modbus({
        //             topic: topic,
        //             tag: message,
        //             breakDate: moment().utcOffset('+16:00').format('YYYY/MM/DD HH:mm:ss'),
        //         })
        //         postModbus.save()
        //         hasCall2++

        //         if (hasCall2 == 10) {
        //             callLine('自來水' + '\n\n' + message)
        //             hasCall2++
        //         }
        //     }

        //     if (topic == 'AH2PHerr') {
        //         const postModbus = new Modbus({
        //             topic: topic,
        //             tag: message,
        //             breakDate: moment().utcOffset('+16:00').format('YYYY/MM/DD HH:mm:ss'),
        //         })
        //         postModbus.save()
        //         hasCall3++

        //         if (hasCall3 == 10) {
        //             callLine('廢水池' + '\n\n' + message)
        //             hasCall3++
        //         }
        //     }

        //     if (topic == 'CH1ACIerr') {

        //         const postModbus = new Modbus({
        //             topic: topic,
        //             tag: message,
        //             breakDate: moment().utcOffset('+16:00').format('YYYY/MM/DD HH:mm:ss'),
        //         })
        //         postModbus.save()

        //         hasCall4++
        //         if (hasCall4 == 10) {
        //             callLine('硫酸' + '\n\n' + message)
        //             hasCall4++
        //         }

        //     }

        //     if (topic == 'A10VPCerr') {
        //         const postModbus = new Modbus({
        //             topic: topic,
        //             tag: message,
        //             breakDate: moment().utcOffset('+16:00').format('YYYY/MM/DD HH:mm:ss'),
        //         })
        //         postModbus.save()
        //         hasCall5++
        //         if (hasCall5 == 10) {
        //             callLine('A10VPC蒸氣壓閥' + '\n\n' + message)
        //             hasCall5++
        //         }
        //     }

        //     if (topic == 'N2Rerr') {
        //         const postModbus = new Modbus({
        //             topic: topic,
        //             tag: message,
        //             breakDate: moment().utcOffset('+16:00').format('YYYY/MM/DD HH:mm:ss'),
        //         })
        //         postModbus.save()
        //         hasCall6++
        //         if (hasCall6 == 10) {
        //             callLine('氮氣' + '\n\n' + message)
        //             hasCall6++
        //         }
        //     }
        // }

        // 數值

        if (topic == 'ElctAir') {
            key.includes('A22') ? (is_A22 = -1) : false
            key.includes('A23') ? (is_A23 = -1) : false

            setTimeout(() => {
                // 變電站
                if (is_A22 == 0) {
                    callLine('變電站 A22 null')
                    is_A22 = -2
                }
                // if (is_A23 == 0) {
                //     callLine('變電站 A23 null')
                //     is_A23 = -2
                // }
            }, 1000)
        }

        // A2監控
        if (topic == 'A2Record') {
            key.includes('A2W3PH') ? (is_A2W3PH = -1) : false
            key.includes('A2W3T') ? (is_A2W3T = -1) : false
            key.includes('A2VP') ? (is_A2VP = -1) : false
            setTimeout(() => {
                if (is_A2W3PH == 0) {
                    callLine('A2監控 PH null')
                    is_A2W3PH = -2
                }
                if (is_A2W3T == 0) {
                    callLine('A2監控 溫度 null')
                    is_A2W3T = -2
                }
                if (is_A2VP == 0) {
                    callLine('A2監控 蒸氣壓力 null')
                    is_A2VP = -2
                }
            }, 3000)
        }
        // 自來水
        if (topic == 'WaterProj') {
            // console.log(msg);
            key.includes('Press') ? (is_Press = -1) : false
            if (key.includes('Sw1') || key.includes('Sw2')) {
                is_Sw = -1
            }
            if (key.includes('Fq1') || key.includes('Fq2')) {
                is_Fq = -1
            }
            setTimeout(() => {
                if (is_Press == 0) {
                    callLine('廢水池 Press null')
                    is_Press = -2
                }
                if (is_Sw == 0) {
                    callLine('廢水池 SW null')
                    is_Sw = -2
                }
                if (is_Fq == 0) {
                    callLine('自來水 FQ null')
                    is_Fq = -2
                }
            }, 3000)
        }

        // 廢水池
        if (topic == 'AH2PH') {
            key.includes('ph') ? (is_ph = -1) : false
            key.includes('Flow') ? (is_Flow = -1) : false
            setTimeout(() => {
                if (is_ph == 0) {
                    callLine('廢水池 ph null')
                    is_ph = -2
                }
                if (is_Flow == 0) {
                    callLine('廢水池 Flow null')
                    is_Flow = -2
                }
            }, 3000)
        }

        // 硫酸
        if (topic == 'CH1ACI') {
            key.includes('A9F1p') ? (is_A9F1p = -1) : false
            key.includes('A10F1p') ? (is_A10F1p = -1) : false
            key.includes('A10F2p') ? (is_A10F2p = -1) : false
            key.includes('A10F3p') ? (is_A10F3p = -1) : false
            key.includes('A10F4p') ? (is_A10F4p = -1) : false
            setTimeout(() => {
                if (is_A9F1p == 0) {
                    callLine('硫酸 A9F1 null')
                    is_A9F1p = -2
                }
                if (is_A10F1p == 0) {
                    callLine('硫酸 A10F1 null')
                    is_A10F1p = -2
                }
                if (is_A10F2p == 0) {
                    callLine('硫酸 A10F2 null')
                    is_A10F2p = -2
                }
                if (is_A10F4p == 0) {
                    callLine('硫酸 A10F4 null')
                    is_A10F4p = -2
                }
                if (is_A10F3p == 0) {
                    callLine('硫酸 A10F3 null')
                    is_A10F3p = -2
                }
            }, 5000)
        }

        // A10蒸氣
        if (topic == 'A10VPC') {
            key.includes('VP') ? (is_VP = -1) : false
            key.includes('CV') ? (is_CV = -1) : false
            setTimeout(() => {
                if (is_VP == 0) {
                    callLine('A10蒸氣 VP null')
                    is_VP = -2
                }
                if (is_CV == 0) {
                    callLine('A10蒸氣 CV null')
                    is_CV = -2
                }
            }, 3000)
        }

        // 氮氣

        if (topic == 'N2R') {
            key.includes('A3T1') ? (is_A3T1 = -1) : false
            key.includes('A3T2') ? (is_A3T2 = -1) : false
            key.includes('A4T1') ? (is_A4T1 = -1) : false
            key.includes('A8T1') ? (is_A8T1 = -1) : false
            key.includes('A16T1') ? (is_A16T1 = -1) : false
            key.includes('A2T1') ? (is_A2T1 = -1) : false
            setTimeout(() => {
                if (is_A3T1 == 0) {
                    callLine('氮氣 A3T1 null')
                    is_A3T1 = -2
                }
                if (is_A3T2 == 0) {
                    callLine('氮氣 A3T2 null')
                    is_A3T2 = -2
                }
                if (is_A4T1 == 0) {
                    callLine('氮氣 A4T1 null')
                    is_A4T1 = -2
                }
                if (is_A8T1 == 0) {
                    callLine('氮氣 A8T1 null')
                    is_A8T1 = -2
                }
                if (is_A16T1 == 0) {
                    callLine('氮氣 A16T1 null')
                    is_A16T1 = -2
                }
                if (is_A2T1 == 0) {
                    callLine('氮氣 A2T1 null')
                    is_A2T1 = -2
                }
            }, 6000)
        }

        // 熱交換器

        if (topic == 'A10HeatX') {
            key.includes('Tch0') ? (is_Tch0 = -1) : false
            key.includes('Tch1') ? (is_Tch1 = -1) : false
            key.includes('Tch2') ? (is_Tch2 = -1) : false
            key.includes('Tch3') ? (is_Tch3 = -1) : false
            key.includes('Tch4') ? (is_Tch4 = -1) : false
            key.includes('Tch5') ? (is_Tch5 = -1) : false
            key.includes('Isw') ? (is_Isw = -1) : false
            key.includes('Isp') ? (is_Isp = -1) : false

            setTimeout(() => {
                if (is_Tch0 == 0) {
                    callLine('A10螺旋式熱交換器 Tch0 null')
                    is_Tch0 = -2
                }
                if (is_Tch1 == 0) {
                    callLine('A10螺旋式熱交換器 Tch1 null')
                    is_Tch1 = -2
                }
                if (is_Tch2 == 0) {
                    callLine('A10螺旋式熱交換器 Tch2 null')
                    is_Tch2 = -2
                }
                if (is_Tch3 == 0) {
                    callLine('A10螺旋式熱交換器 Tch3 null')
                    is_Tch3 = -2
                }
                if (is_Tch4 == 0) {
                    callLine('A10螺旋式熱交換器 Tch4 null')
                    is_Tch4 = -2
                }
                if (is_Tch5 == 0) {
                    callLine('A10螺旋式熱交換器 Tch5 null')
                    is_Tch5 = -2
                }
                if (is_Isw == 0) {
                    callLine('A10螺旋式熱交換器 變頻器開關 null')
                    is_Isw = -2
                }
                if (is_Isp == 0) {
                    callLine('A10螺旋式熱交換器 變頻器速度 null')
                    is_Isp = -2
                }
            }, 5000)
        }
    }
})