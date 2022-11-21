const { SlashCommandBuilder, MessageEmbed } = require('discord.js')
const userMessages = require("../models/index").userMessages

module.exports = {
   enabled: false,
   data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription('Top users by messages sent.'),
    async execute(interaction, options, client) {
        const serverData = await userMessages.findAll({where: {guildId: interaction.guild.id}, order: [['messages', 'DESC']], raw:true})
        const guild = client.guilds.cache.get(interaction.guild.id)
        var content = getLb(guild, serverData)
        

        const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`${interaction.guild.name} message leaderboard`)
        .setDescription(content)
      
    return await interaction.reply({ embeds: [embed] })
    }   
}

function getLb(guild, serverData) {
    var content = ``
    var index = 0
    for (const entry of serverData)
    {
        index++
        if(index>10) return content
        const user = guild.members.cache.get(entry.userId).user
        content = `${content}\n**${index}.** ${user.username} at ${entry.messages} message${entry.messages > 1 || entry.messages <= 0 ? "s" : "" }`
    }
    return content
}