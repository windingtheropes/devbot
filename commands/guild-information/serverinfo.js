const { SlashCommandBuilder } = require('discord.js')
const {MessageEmbed} = require('discord.js')
// const getTimePassed = require('../../utils/getTimeFromTimestamp.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Gets information about the current guild.'),
    async execute(interaction) {
        const owner = await interaction.guild.fetchOwner()
           
        const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`${interaction.guild.name} information`)
        .setThumbnail(interaction.guild.iconURL())
        .addField('Icon URL', interaction.guild.iconURL({dynamic: true}), false)
        .addField('Owner', `${owner.user.tag}`, true)
        .addField('User ID', `${owner.user.id}`, true)
        .addField('Server ID', interaction.guild.id, false)
        .addField('Creation Date', `${new Date(interaction.guild.createdAt).toUTCString()}`)
        .addField('Member Count', `${interaction.guild.memberCount}`, false)
         return interaction.reply({embeds: [embed]})
    }
}