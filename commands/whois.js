const Discord = require('discord.js')
const getTimePassed = require('../utils/getTimeFromTimestamp')
module.exports = {
    name: "whois",
    miniDescription: 'Get information about a user.',
    description: 'Get information about a user.',
    usage: '[query]',
    commands: ['whois'],
    callback: async (message, args, text, client) => {
        var query = args.join(' ')

        var query = args.join(' ')
        if(!query)
        {
            getInfo(message.author, message)
        }
        else if (query.startsWith('<@') && query.endsWith('>')) { // mention
            query = query.replace(/[<#!>]/g, '')
            
           const user = await message.guild.users.cache.get(query)
           getInfo(user, message)
          
        }
        else
        {
            const user = await message.guild.users.cache.get(query)
           getInfo(user, message)
        }
        

    }
}





function getInfo(user, message)
{
    if(!user) {
        return message.reply({content: 'Could not find user.', allowedMentions: {repliedUser: false}})
    }
    const embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle(`whois ${user.username}`)
    .setDescription(`${user.username}#${user.discriminator}`)
    .setThumbnail(user.avatarURL())
    .addField('Avatar URL', user.avatarURL())
    .addField('ID', user.id, false)
    .addField('Account Creation Date', `${getTimePassed(Date.now() - user.createdAt)} ago (${new Date(user.createdAt).toUTCString()})`)
    .addField(`Joined ${message.guild.name} at`, new Date(user.joinedAt).toUTCString())
    
return message.reply({embeds: [embed], allowedMentions: {repliedUser: false}})
}
   