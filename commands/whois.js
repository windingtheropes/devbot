const Discord = require('discord.js')
const getTimePassed = require('../utils/getTimeFromTimestamp')
module.exports = {
    name: "whois",
    miniDescription: 'Get information about a user, channel or server.',
    description: 'Get information about a user, channel or server.',
    usage: '<query>',
    minArgs: 1,
    commands: ['whois'],
    callback:  (message, args, text, client) => {
        var query = args.join(' ')
        if (query.startsWith('<@') && query.endsWith('>')) { // mention
            query = query.replace(/[<@!>]/g, '')
            
            client.users.fetch(query).then(user => {
               
                var gUser = client.guilds.cache.get(message.guild.id).members.cache.get(user.id)
                const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`whois for ${user.username}`)
                    .setDescription(`${user.username}#${user.discriminator}`)
                    .setThumbnail(user.avatarURL())
                    .addField('Avatar URL', user.avatarURL())
                    .addField('ID', user.id, false)
                    .addField('Account Creation Date', `${getTimePassed(Date.now() - user.createdAt)} ago (${new Date(user.createdAt).toUTCString()})`)
                    .addField(`Joined ${message.guild.name} at`, new Date(gUser.joinedAt).toUTCString())
                    
                return message.reply({embeds: [embed], allowedMentions: {repliedUser: false}})
            }).catch(err => {
                message.reply({content: 'Could not find user.', allowedMentions: {repliedUser: false}})
            })
        }
        if (query.startsWith('<#') && query.endsWith('>')) { // channel
            query = query.replace(/[<#!>]/g, '')
            
           const channel = message.guild.channels.cache.get(query)
           const embed = new Discord.MessageEmbed()
           .setColor('#0099ff')
           .setTitle(`channel information for ${channel.name}`)
           .addField('Type', channel.type)
           .addField('ID', channel.id, false)
           .addField('Creation Date', `${getTimePassed(Date.now() - channel.createdAt)} ago (${new Date(channel.createdAt).toUTCString()})`)
            return message.reply({embeds: [embed], allowedMentions: {repliedUser: false}})
          
        }
       
        

    }
}