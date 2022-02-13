const { Permissions } = require('discord.js')

module.exports.listen = async (client) => {
    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;
    
        const command = client.commands.get(interaction.commandName)
    
        if(!command) return;

        let {
            enabled = true,
            guildsOnly = true,
            permissions
        } = command

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