const mongoose = require('mongoose');
const PostSchema = mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    permission: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Posts', PostSchema)
