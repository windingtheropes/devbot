

const Discord = require('discord.js')
const getTimePassed = require('../utils/getTimeFromTimestamp')
module.exports = {
    name: "channelinfo",
    miniDescription: 'Get information about a channel.',
    description: 'Get information about a channel.',
    usage: '<query>',
    commands: ['channelinfo'],
    callback: async (message, args, text, client) => {
        var query = args.join(' ')
        if(!query)
        {
            getInfo(message.channel, message)
        }
        else if (query.startsWith('<#') && query.endsWith('>')) { // channel
            query = query.replace(/[<#!>]/g, '')
            
           const channel = await message.guild.channels.cache.get(query)
           getInfo(channel, message)
          
        }
        else
        {
            const channel = await message.guild.channels.cache.get(query)
           getInfo(channel, message)
        }
        

    }
}

function getInfo(channel, message)
{
    if(!channel) {
        return message.reply({content: 'Could not find channel.', allowedMentions: {repliedUser: false}})
    }
    const embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle(`Channel information for ${channel.name}`)
    .addField('Type', channel.type)
    .addField('ID', channel.id, false)
    .addField('Creation Date', `${getTimePassed(Date.now() - channel.createdAt)} ago (${new Date(channel.createdAt).toUTCString()})`)
     return message.reply({embeds: [embed], allowedMentions: {repliedUser: false}})
}
   