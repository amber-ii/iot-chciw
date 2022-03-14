const Modbus = require('../models/Modbus')

Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() - days)
    return this
}

let today = new Date()
let week = new Date(today.addDays(7))

const getAllRecord = async(req, res, next) => {
    if (req.user.permission == 1) {
        try {
            const posts = await Modbus.find().sort({ breakDate: -1 })
            res.json(posts)
        } catch (err) {
            res.json({ message: err })
        }
    } else {
        res.sendFile(`${process.cwd()}/public/404.html`)
    }
}

const getThisWeek = async(req, res, next) => {
    if (req.user.permission == 1) {
        try {
            // const posts = await Modbus.find().sort({ breakDate: -1 })
            const posts = await Modbus.find({ breakDate: { $gte: week } }).sort({ breakDate: -1 })
            res.json(posts)
        } catch (err) {
            res.json({ message: err })
        }
    } else {
        res.sendFile(`${process.cwd()}/public/404.html`)
    }
}

const getThisMonth = async(req, res, next) => {
    if (req.user.permission == 1) {
        try {
            const posts = await Modbus.find({ breakDate: { $lte: months } }).sort({ breakDate: -1 })
            res.json(posts)
        } catch (err) {
            res.json({ message: err })
        }
    } else {
        res.sendFile(`${process.cwd()}/public/404.html`)
    }
}

const getByTopicName = async(req, res, next) => {
    if (req.user.permission == 1) {
        try {
            // let posts = await Modbus.find({ topic: { $regex: req.params.topics } })
            // let posts = await Modbus.find({ topic: req.params.topics }).find({ breakDate: { $gte: week } })
            let posts = await Modbus.find({ topic: req.params.topics, breakDate: { $gte: week } }).sort({ breakDate: -1 })

            console.log('我是資料庫回傳結果' + posts)
            res.json(posts)
        } catch (err) {
            console.log("有錯")
            res.json({ message: err })
        }
    } else {
        res.sendFile(`${process.cwd()}/public/404.html`)
    }

}

// const getThreeMonth = async(req, res, next) => {
//     if (req.user.permission == 1) {
//         try {
//             const posts = await User.find({
//                 loginDate: { $gte: three_month },
//             }).sort({ loginDate: -1 })
//             res.json(posts)
//         } catch (err) {
//             res.json({ message: err })
//         }
//     } else {
//         res.sendFile(`${process.cwd()}/public/404.html`)
//     }
// }

// const getSixMonth = async(req, res, next) => {
//     if (req.user.permission == 1) {
//         try {
//             const posts = await User.find({
//                 loginDate: { $gte: six_month },
//             }).sort({ loginDate: -1 })
//             res.json(posts)
//         } catch (err) {
//             res.json({ message: err })
//         }
//     } else {
//         res.sendFile(`${process.cwd()}/public/404.html`)
//     }
// }

module.exports = {
    getAllRecord,
    getThisWeek,
    getThisMonth,
    getByTopicName
    // getSixMonth,
}