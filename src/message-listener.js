//coad is fun :D
//for non command features that involve running when a message is sent

const getRandom = require('./utils/getRandom')
const messageTextFilter = require('./messageTextFilter')

module.exports.listen = (client) => {
    client.on('message', (message) => {
        
        if(message.author == client.user)
        {
            return
        }

        messageTextFilter(message)
        
    })
}