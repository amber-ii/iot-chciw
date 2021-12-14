const User = require('../models/Login')

Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() - days)
    return this
}

let today = new Date()
let year = today.getFullYear()
let month = today.getMonth() + 1
let three_month = new Date(today.addDays(90))
let six_month = new Date(today.addDays(90))

const getAllRecord = async(req, res, next) => {
    if (req.user.permission == 1) {
        try {
            const posts = await User.find().sort({ loginDate: -1 })
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
            const posts = await User.find({ loginDate: { $gte: new Date(`${year}-${month}-01`) } }).sort({ loginDate: -1 })
            res.json(posts)
        } catch (err) {
            res.json({ message: err })
        }
    } else {
        res.sendFile(`${process.cwd()}/public/404.html`)
    }
}

const getThreeMonth = async(req, res, next) => {
    if (req.user.permission == 1) {
        try {
            const posts = await User.find({
                loginDate: { $gte: three_month },
            }).sort({ loginDate: -1 })
            res.json(posts)
        } catch (err) {
            res.json({ message: err })
        }
    } else {
        res.sendFile(`${process.cwd()}/public/404.html`)
    }
}

const getSixMonth = async(req, res, next) => {
    if (req.user.permission == 1) {
        try {
            const posts = await User.find({
                loginDate: { $gte: six_month },
            }).sort({ loginDate: -1 })
            res.json(posts)
        } catch (err) {
            res.json({ message: err })
        }
    } else {
        res.sendFile(`${process.cwd()}/public/404.html`)
    }
}

module.exports = {
    getAllRecord,
    getThisMonth,
    getThreeMonth,
    getSixMonth,
}