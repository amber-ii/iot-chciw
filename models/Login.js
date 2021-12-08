const mongoose = require('mongoose')
const LoginSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    permission: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: false,
    },
    loginDate: {
        type: Date,
        required: false,
    },
    logoutDate: {
        type: Date,
        required: false,
    },
})
module.exports = mongoose.model('Login', LoginSchema)