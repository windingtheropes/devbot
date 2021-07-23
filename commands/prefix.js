const mongo = require('../utils/mongo')
const commandPrefixSchema = require('../schemas/command-prefix-schema')
module.exports = {
    commands: 'prefix',
    callback: async (message, args, text, client, prefix) => {
        const { member } = message
        if (args[0]) {
            if (args[0].toLowerCase() === 'set') {
                if (member.hasPermission('ADMINISTRATOR') || member.hasPermission('MANAGE_SERVER')) {
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

                            await commandPrefixSchema.findOneAndUpdate({
                                _id: guildId
                            }, {
                                _id: guildId,
                                prefix
                            }, {
                                upsert: true
                            })

                            message.reply('The prefix is now set to `' + prefix + '`')
                        } finally {
                            mongoose.connection.close()
                        }
                    })
                } else {
                    message.reply("Isufficient permissions.")
                }
            }
        } else {
            message.reply('The bot prefix is `' + prefix + '`')
        }
    }
}