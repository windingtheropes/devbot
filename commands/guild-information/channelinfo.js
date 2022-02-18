const { SlashCommandBuilder } = require('@discordjs/builders')
const { Permissions } =  require('discord.js')
const {MessageEmbed} = require('discord.js')
const getTimePassed = require('../../utils/getTimeFromTimestamp.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('channelinfo')
        .setDescription('Gets information about a channel.')
        .addChannelOption(option => 
            option.setName('query')
                .setDescription("The channel to get information about."))
                ,
    async execute(interaction) {
        var query = await interaction.options.getChannel('query')
        if(!query) {
            query = interaction.channel
        }
        const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`${query.name} information`)
        .addField('Type', query.type)
        .addField('Channel ID', `${query.id}`, true)
        .addField('Server ID', interaction.guild.id, false)
        .addField('Creation Date', `${getTimePassed(Date.now() - query.createdAt)} ago (${new Date(query.createdAt).toUTCString()})`)
         return interaction.reply({embeds: [embed]})
    }
}