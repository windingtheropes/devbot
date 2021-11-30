const mongoose = require('mongoose')
const commandPrefixSchema = mongoose.Schema({
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
    // chats: [{"id":"1234", "members":["12345"]}]  
})

module.exports = mongoose.model('guild-microchats', commandPrefixSchema)