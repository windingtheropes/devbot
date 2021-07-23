const Discord = require('discord.js')

module.exports = {
    commands: 'help',
    description: "Get help for using devbot. To get specific command help, add one of the command's aliases as the first argument. For generic help, run the command without any arguments.",
    usage: "[command]",
    callback: (message, args, text, client, prefix, allCommands) => {
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
                if(command.description)
                {
                    const helpEmbed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('Command help')
                        .setAuthor('devbot')
                        .setDescription(command.description)
                        .addField('Usage', `${prefix}${commandName} ${command.usage || ''}`, false)
                        .addField('Aliases', command.commands)
                    message.channel.send(helpEmbed)
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
            .addField('Usage', 'Arguments wrapped in <> are required, while arguments wrapped in [] are optional. Note: if you use one optional argument you must use them all in the correct order.', false)
            
            message.channel.send(helpEmbed)
        }
    }
    
}