const Discord = require('discord.js')

module.exports = {
    commands: 'help',
    miniDescription: 'Bot help.',
    description: "Get help for using devbot. To get specific command help, add one of the command's aliases as the first argument. For generic help, run the command without any arguments.",
    usage: "[command]",
    callback: async (message, args, text, client, prefix, allCommands, commandList) => {
        let commandName
        if(args[0])
        {
            commandName = args[0].toLowerCase()
        }
        if(commandName)
        {
            
            const command = allCommands[commandName]
            
            if(command)
            {   
                if(command.enabled === false)
                {
                    
                }
                if(command.description)
                {
                    var exampleUsageString =''
                    
                    if(command.exampleUsage)
                    {
                        command.exampleUsage.forEach(use => {
                            exampleUsageString = `${exampleUsageString}\n${prefix}${commandName} ${use}`
                        })
                    }
                    else
                    {
                        exampleUsageString = "unavailable"
                    }
                   
                    const helpEmbed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('Command help')
                        .setAuthor('devbot')
                        .setDescription(command.description)
                        .addField('Usage', `${prefix}${commandName} ${command.usage}`, false)
                        .addField('Aliases', command.commands.join(', '), false)
                        .addField('Example Usage', `${exampleUsageString}`, false)

                    
                   
                    await message.channel.send({embeds: [helpEmbed]})
                }
                else
                {
                    message.channel.send('No help available for command `' + `${commandName}` + '`')
                }
            }
            else
            {
                message.channel.send('Could not find a command with alias `' + `${commandName}.` + '`')
            }
        }
        else
        {
            const helpEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Help')
            .setAuthor('devbot')
            .setDescription('Devbot commands are fairly simple, commands and arguments are not sensitive to case. Some commands have multiple aliases.')
            .addField('Usage', 'Arguments wrapped in <> are required, while arguments wrapped in [] are optional. Note: if you use one optional argument you must use them all in the correct order. The brackets are for example purposes only, do not use them when actually running a command.', false)
        
            // commandList.forEach(cmd => {
            //     const aliases = cmd[0].toString()
            //     var miniDescription = cmd[1]
            //     if(miniDescription === '' || undefined || null)
            //     {
            //         miniDescription = 'unavailable'
            //     }
            //     const listed = cmd[2]

            //     if(listed)
            //     {
            //         helpEmbed.addField(aliases, miniDescription, false)
            //     }
            // })
            await message.channel.send({embeds: [helpEmbed]})
        }
    }
    
}