const getRandom = require('../utils/getRandom')
module.exports = {
    commands: ['rng', 'random'],
    minArgs: 2,
    maxArgs: 2,
    usage: '<start> <end>',
    callback: (message, args, text, client) => {
        const num1 = args[0]
        const num2 = args[1]

        if(!(parseInt(num1) && parseInt(num2)) && num1 != 0 && num2 != 0)
        {
            return message.reply(`Both variables must be numbers.`)
        }

        message.reply(getRandom(num1, num2).toString())
    }
}