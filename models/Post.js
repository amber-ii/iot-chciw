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
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: false
    }
});
module.exports = mongoose.model('Posts', PostSchema);
