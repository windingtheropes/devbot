const { SlashCommandBuilder } = require('@discordjs/builders')
const { Permissions } =  require('discord.js')
module.exports = {
    permissions: Permissions.FLAGS.MANAGE_MESSAGES,
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Says what you say.')
        .addStringOption(option => 
            option.setName('message')
                .setDescription('The message to send.')
                .setRequired(true)
                )
        .addChannelOption(option => 
            option.setName('channel')
                .setDescription('The channel to send the message in.')
                ),
    async execute(interaction, client) {
        var channel = interaction.options.getChannel('channel')
        if(!channel)
        {
            channel = interaction.channel
        }


        if(!(channel.type === 'GUILD_PRIVATE_THREAD' || channel.type == 'GUILD_TEXT' || channel.type == 'GUILD_NEWS' || channel.type == 'GUILD_NEWS_THREAD' || channel.type == 'GUILD_PUBLIC_THREAD'))
        {
            return interaction.reply({content: 'The channel type is not supported.', ephemeral: true})
        }   
        
        const message = interaction.options.getString('message')
        await interaction.reply({content: `Sent '${message}' in <#${channel.id}>.`, ephemeral: true})
        channel.send(message)
    }
}