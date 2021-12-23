const mongo = require('../utils/mongo')
const commandPrefixSchema = require('../schemas/command-prefix-schema')

module.exports = {
    minArgs: 0,
    maxArgs: 2,
    commands: 'prefix',
    miniDescription: 'Get and set the bot prefix.',
    description: 'Bot prefix information. Leave the arguments blank to get the bot prefix, and use the set argument to set it, if you have manage server permissions.',
    usage: '[set] [prefix]',
    callback: async (message, args, text, client, prefix) => {
        const { member } = message
        if (args[0]) {
            if (args[0].toLowerCase() === 'set') {
                
                    const prefix = args[1]

                    if (prefix === '' || prefix === null || prefix === undefined) {
                        return message.reply("The prefix can't be empty.")
                    }
                    if (prefix.length > 1) {
                        return message.reply("The prefix must be one character.")
                    }

                    await mongo().then(async (mongoose) => {
                        try {
                            const guildId = message.guild.id

                            await commandPrefixSchema.findOneAndUpdate(
                        {
                                _id: guildId
                            }, 
                            {
                                _id: guildId,
                                prefix
                            }, 
                            {
                                upsert: true
                            })

                            message.reply('The prefix is now set to `' + prefix + '`')
                        } finally {
                            // mongoose.connection.close()
                        }
                    })
            }
        } else {
            message.reply('The bot prefix is `' + prefix + '`')
        }
    }
}