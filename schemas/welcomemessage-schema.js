const mongoose = require('mongoose')
const schema = mongoose.Schema({
    //Guild ID
    _id: {
        type: String,
        required: true
    },
    //Settings
    joinMsgEnabled: {
        type: Boolean,
        required: false
    },
    leaveMsgEnabled: {
        type: Boolean,
        required: false
    },

    joinMsg: {
        type: String,
        required: false
    },
    leaveMsg: {
        type: String,
        required: false
    },

    channelId: {
        type: String,
        required: false
    }

    
})

module.exports = mongoose.model('joinleave-messages', schema)