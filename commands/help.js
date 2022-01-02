const Discord = require('discord.js')

module.exports = {
    commands: 'help',
    miniDescription: 'Bot help.',
    description: "Get help for using devbot. To get specific command help, add one of the command's aliases as the first argument. For generic help, run the command without any arguments.",
    usage: "[command]",
    callback: async (message, args, text, client, prefix, allCommands, commandList) => {
        if (args[0]) {
            const query = args[0].toLowerCase()
            args.shift()
            const command = allCommands[query]

            var exampleUsage

            if (command.exampleUsage) {
                command.exampleUsage.forEach(example => {
                    exampleUsage = `${exampleUsage || ''}\n${prefix}${query} ${example}`
                })
            }

            const embed = new Discord.MessageEmbed()
                .setTitle(`${query}${command.name ? ` - ${command.name}` : ''}`)
                .setDescription(command.description)
                .addField('Usage', `${prefix}${query} ${command.usage}`, true)
                if (command.exampleUsage) { embed.addField('Example Usage', exampleUsage, true) }
            message.reply({ embeds: [embed] })
        }
        else {

            const embed = new Discord.MessageEmbed()
                .setTitle('Devbot Help')
                .setDescription(`Devbot is a multipurpose bot with various features. To get help for a specific command, run \`${prefix}help [command]\`\n\nCommand syntax: \`${prefix}<command> <required> [optional]\`\n\nCertain more advanced commands may include more syntax indicators.`)
            message.reply({ embeds: [embed] })
        }




    }

}