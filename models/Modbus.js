const mongoose = require('mongoose');
const ModbusSchema = mongoose.Schema({
    topic: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
    },
    breakDate: {
        type: Date,
        required: true,
    },
})
module.exports = mongoose.model('Modbus', ModbusSchema)