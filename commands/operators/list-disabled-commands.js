const disabledCommandsSchema = require('../../schemas/disabled-commands-schema')
const mongo = require('../../utils/mongo')
module.exports = {
    commands: ['listdisabledcommands'],
    callback: async (message, args, text, client) => {
        await mongo().then(async mongoose => {
            try
            {
                const all = await disabledCommandsSchema.find({disabled: true})
                if(all == [] || !all)
                {
                    return message.reply("There are currently no disabled commands.")
                }
                var commandsString
                all.forEach(command => {
                    commandsString = `${commandsString ? commandsString + ',' : ''} ${'`' + command.id + '`'}`
                })
                commandsString = `${commandsString}.`
                message.reply(`The following commands are temporarily disabled: ${commandsString}`)
            }
            finally
            {

            }
        })
    }
}