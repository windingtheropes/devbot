

const Discord = require('discord.js')
const getTimePassed = require('../utils/getTimeFromTimestamp')
module.exports = {
    name: "serverinfo",
    miniDescription: 'Get information about the current server.',
    description: 'Get information about the current server.',
    commands: ['serverinfo'],
    callback: async (message, args, text, client) => {
    
           const embed = new Discord.MessageEmbed()
           .setColor('#0099ff')
           .setTitle(`${message.guild.name} information`)
           .addField('ID', message.guild.id, false)
           .addField('Creation Date', `${getTimePassed(Date.now() - message.guild.createdAt)} ago (${new Date(message.guild.createdAt).toUTCString()})`)
           .addField('Member Count', `${message.guild.memberCount}`, false)
            return message.reply({embeds: [embed], allowedMentions: {repliedUser: false}})
          


    }
}

   