const disabledCommandsSchema = require('../../schemas/disabled-commands-schema')
const mongo = require('../../utils/mongo')
module.exports = {
    commands: ['cleardisabledcommands'],
    operatorOnly: true,
    callback: async (message, args, text, client) => {
        await mongo().then(async mongoose => {
            try
            {
                disabledCommandsSchema.deleteMany({disabled: true}).exec()
                message.reply('Re-enabled all disabled commands.')
            }
            finally
            {

            }
        })
    }
}