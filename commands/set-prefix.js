const mongo = require('../utils/mongo.js')
const commandPrefixSchema = require('../schemas/command-prefix-schema.js')
module.exports = {
    commands: 'setprefix',
    permissions: ['MANAGE_GUILD'],
    callback: async (message, args, text, client) => {
        const prefix = args[0]

        if(prefix === '' || prefix === null || prefix === undefined)
        {
            return message.reply("The prefix can't be empty.")
        }
        if(prefix.length > 1)
        {
            return message.reply("The prefix must be one character.")
        }

        await mongo().then(async (mongoose) => {
            try {
                const guildId = message.guild.id
               
                await commandPrefixSchema.findOneAndUpdate(
                {
                    _id: guildId
                }, {
                    _id: guildId, 
                    prefix
                }, {
                    upsert: true
                })

                message.reply(`The prefix is now set to ${prefix}`)
            } finally {
                mongoose.connection.close()
            }
        })
    }
}