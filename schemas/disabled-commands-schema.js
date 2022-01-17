const mongoose = require('mongoose')
const schema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    disabled: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('disabled-commands', schema)