const disabledCommandsSchema = require('../../schemas/disabled-commands-schema')
const mongo = require('../../utils/mongo')
module.exports = {
    commands: ['disablecommand'],
    operatorOnly: true,
    callback: async (message, args, text, client, commandsList, allCommands) => {
        const commandToDisable = args[0].toLowerCase()
        const command = allCommands[commandToDisable]
        var option = true
        switch(args[1])
        {
            case 'disable':
            case 'true':
                option = true
                break;
            case 'enable':
            case 'false':
                option = false
                break;
            default:
                break;
        }
        if (command) {
            await mongo().then(async mongoose => {
                try {
                    if(option == true)
                    {
                        disabledCommandsSchema.findOneAndUpdate(
                            {
                                _id: command.id
                            },
                            {
                                disabled: option
                            },
                            {
                                upsert: true
                            }).exec()
                    }
                    else
                    {
                        disabledCommandsSchema.deleteOne({_id: command.id}).exec()
                    }
                    return message.reply(`Command ${option ? 'disabled' : 'enabled'}`)
                }
                finally {

                }
            })
        }
        else {
            return message.reply("Command not found.")
        }
    }
}