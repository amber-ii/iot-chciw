const Modbus = require('../models/Modbus')

Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() - days)
    return this
}

let today = new Date()
let week = new Date(today.addDays(-7))
let months = new Date(today.addDays(-23))

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
            const posts = await Modbus.find({ breakDate: { $lt: week } }).sort({ breakDate: -1 })
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
            const posts = await Modbus.find({ breakDate: { $lt: months } }).sort({ breakDate: -1 })
            res.json(posts)
        } catch (err) {
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
    // getSixMonth,
}