const { SlashCommandBuilder, EmbedBuilder, ChannelType, channelLink } = require('discord.js')
// const getTimePassed = require('../../utils/getTimeFromTimestamp.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('channelinfo')
        .setDescription('Gets information about a channel.')
        .addChannelOption(option => 
            option.setName('channel')
                .setDescription("The channel to get information about."))
                ,
    async execute(interaction) {
        const channel = await (async () => {
            const query = await interaction.options.getChannel('channel')
            if(query) {
                return query
            }
            else {
                return interaction.channel
            }
        })()

        // const channelType = (() => {
        //     switch (channel.type) {
        //         case ChannelType.GuildAnnouncement:
        //             return 'announcements'
        //         case ChannelType.GuildCategory:
        //             return 'category'
        //         case ChannelType.GuildDirectory:
        //             return 'directory'
        //         case ChannelType.GuildForum:
        //             return 'forum'
        //         case ChannelType.GuildStageVoice:
        //             return 'stage'
        //         case ChannelType.GuildText:
        //             return 'text'
        //         case ChannelType.GuildVoice:
        //             return 'voice'
        //     }
        // })()
        const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle(`${channel.name}`)
        .addFields([
            // {name: 'Type', value: `${channelType}`},
            {name: 'Channel ID', value: `${channel.id}`},
            // {name: 'Server ID', value: `${interaction.guild.id}`},
            {name: 'Creation Date', value: `${new Date(channel.createdAt).toUTCString()}`}
        ])
         return interaction.reply({embeds: [embed]})
    }
}