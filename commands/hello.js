const getRandom = require('../utils/getRandom')
module.exports = {
    commands: ['hello'],
    callback: (message, arguments, text) => {
        const responses = ['hello', 'yo', 'ello', 'bonjour', 'allo allo allo']
        let random = getRandom(0, responses.length-1)
        message.channel.send(responses[random])
    },
}