const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
// const getTimePassed = require('../../utils/getTimeFromTimestamp.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Gets information about the current guild.'),
    async execute(interaction) {
        const owner = await interaction.guild.fetchOwner()
           
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
        {name: 'Member Count', value: `${interaction.guild.memberCount}`}
        ])
        
        return interaction.reply({embeds: [embed]})
    }
}