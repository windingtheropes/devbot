const metricsSchema = require('../schemas/guildmetrics-schema')
const mongo = require('../utils/mongo')
module.exports = {
    commands: 'metricsenabled',
    callback: async (message, args, text, client) => {
        const {author, guild} = message
        await mongo().then(async (mongoose) => {
            try {

                var enabled = false;
                switch(args[0].toLowerCase()) {
                    case 'yes':
                    case 'true':
                        enabled = true;
                        break;
                    case 'no':
                    case 'false':
                        enabled = false;
                        break;
                    default:
                     
                        break;
                }

                await metricsSchema.findOneAndUpdate(
                    {
                        _id: guild.id
                    },
                    {
                        $set: {
                            enabled,
                            metrics : {}
                        }
                    },
                    {
                        upsert: true
                    })
                return message.reply(`${enabled ? 'Enabled' : 'Disabled'} metrics.`)

            } finally {
                mongoose.connection.close()
            }
        })
    }
}