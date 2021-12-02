const mongoose = require('mongoose')
const schema = mongoose.Schema({
    //Guild ID
    _id: {
        type: String,
        required: true
    },
    //ID of the chats category
    categoryId: {
        type: String,
        required: true
    },
    //IDs of the chat channels
    chats: {
        type: Array,
        required: false
    }
})

module.exports = mongoose.model('guild-microchats', schema)