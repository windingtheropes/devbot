const getRandom = require('../utils/getRandom')
module.exports = {
    commands: 'random',
    minArgs: 2,
    maxArgs: 2,
    usage: '<num1> <num2>',
    miniDescription: 'Get a random number.',
    description: 'Get a random number from a range.',
    callback: (message, args, text, client) => {
        return message.channel.send('`' + getRandom(args[0], args[1]) +'`')
    }
}