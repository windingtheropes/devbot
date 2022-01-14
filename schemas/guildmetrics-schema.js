const mongoose = require('mongoose')
const schema = mongoose.Schema({
    //Guild ID
    _id: {
        type: String,
        required: true
    },
    enabled: {
        type: Boolean, 
        required: true
    },
    metrics: {
        type: Object,
        required: true
    }
})

module.exports = mongoose.model('guild-metrics', schema)