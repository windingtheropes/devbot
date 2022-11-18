// const { PermissionFlagsBits } = require('discord.js')
const Operators = require("../models/index").operators

module.exports.listen = async (client) => {
    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;
    
        const command = client.commands.get(interaction.commandName)
    
        if(!command) return;

        let {
            enabled = true,
            guildsOnly = true,
            operatorsOnly = false,
            permissions
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
                return interaction.reply({ content: 'You do not have permissison to run this command.', ephemeral: true })
            }
        }

        if(!interaction.guild && guildsOnly)  
        {
            return interaction.reply({ content: 'This command is only available in guilds.', ephemeral: true })
        }

        const guildMember = await interaction.guild.members.fetch({ user: interaction.user.id, force: true })

        if(permissions)
        {
            if(typeof permissions != 'array')
            {
                permissions = [permissions]
            }
            var pint = 0
            permissions.forEach(permission => {
                if(guildMember.permissions.has(permission))
                {
                    pint++
                }
            })
            if(pint === 0)
            {
                return interaction.reply({ content: 'You do not have permissison to run this command.', ephemeral: true })
            }
        }

        try {
            await command.execute(interaction, client)
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing the command.', ephemeral: true })
        }
    })
}