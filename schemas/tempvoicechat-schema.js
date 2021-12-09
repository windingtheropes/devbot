const mongoose = require('mongoose')
const schema = mongoose.Schema({
    //Guild ID
    _id: {
        type: String,
        required: true
    },
    channels: {
        type:Array,
        required: true
    }
    
})

module.exports = mongoose.model('temporary-voicechats', schema)