const messageCountSchema = require('../../schemas/message-count-schema')
const mongo = require('../../utils/mongo')
module.exports = {
    callback: async (message, client) => {

        const { author, guild } = message

        

        await mongo().then(async mongoose => {
            try {

                await messageCountSchema
                    .findOneAndUpdate(
                        {
                            userId: author.id, guildId: guild.id
                        },
                        {
                            
                            $inc: {
                                messageCount: 1
                            }
                            
                        },
                        {
                            upsert: true
                        }
                    ).exec()

            }
            finally {
                // mongoose.connection.close()
            }
        })
    }
}