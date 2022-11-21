const { Events } = require("discord.js");

// const { PermissionFlagsBits } = require('discord.js')
const Operators = require("../models/index").operators

module.exports.listen = async (client) => {
    client.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isCommand()) return;
    
        const command = client.commands.get(interaction.commandName)
        const options = {
            ephemeral: true
        }
        if(!command) return;

        let {
            enabled = true,
            guildsOnly = true,
            operatorsOnly = false
        } = command

        if (!enabled) {
            return console.log(`[WARNING] ${interaction.commandName} is disabled and is a slash command; meaning the output was unresponsive and treated as an erorr. Consider removing this command instead.`)
        }

        // Operator Only commands are commands reserved for the person(s) responsible for managing the bot, for special commands
        if (operatorsOnly) {
            const user = await Operators.findOne({
                where: {
                    userId: interaction.user.id
                }
            })
            
            if(!user)
            {
                return interaction.reply({ content: "You don't have permission to run this command.", ephemeral: true })
            }
        }

        if(!interaction.guild && guildsOnly)  
        {
            return interaction.reply({ content: 'This command is only available in servers.', ephemeral: true })
        }

        // const guildMember = await interaction.guild.members.fetch({ user: interaction.user.id, force: true })

        try {
            // if(interaction.options.getBoolean('ephemeral') == false) {
            //     options.ephemeral = false
            // }
            await command.execute(interaction, options, client)
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing the command.', ephemeral: true })
        }
    })
}