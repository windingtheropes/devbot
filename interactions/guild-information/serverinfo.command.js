const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
// const getTimePassed = require('../../utils/getTimeFromTimestamp.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Gets information about the current guild.'),
    async execute(interaction, options, client) {
        const owner = await interaction.guild.fetchOwner()
        
        const serverMembers = await interaction.guild.members.fetch({force:true})
        const guildUserCount = serverMembers.filter(m => !m.user.bot).map(m => m).length
        const guildBotCount = serverMembers.filter(m => m.user.bot).map(m => m).length

        const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle(`${interaction.guild.name} information`)
        .setThumbnail(interaction.guild.iconURL())
        .addFields([
        {name: 'Icon URL', value: interaction.guild.iconURL({dynamic: true})}, 
        {name: 'Owner', value:`${owner.user.tag}`}, 
        {name: 'User ID', value: `${owner.user.id}`},
        {name: 'Server ID', value: interaction.guild.id},
        {name: 'Creation Date', value: `${new Date(interaction.guild.createdAt).toUTCString()}`},
        {name: 'User Count', value: `${guildUserCount}`},
        {name: 'Bot Count', value: `${guildBotCount}`}
        ])
        
        return interaction.reply({embeds: [embed]})
    }
}