const Discord = require('discord.js')
module.exports = {
    name: "whois",
    miniDescription: 'Get information about a user, channel or server.',
    description: 'Get information about a user, channel or server.',
    usage: '<query>',
    minArgs: 1,
    commands: ['whois'],
    callback: async (message, args, text, client) => {
        var query = args.join(' ')

        if (query.startsWith('<@') || query.endsWith('>')) {
            query = query.replace(/[<@!>]/g, '')
           
            await client.users.fetch(query).then(user => {
                var timeSince = Date.now() - user.createdAt
                var secondsSince = timeSince/1000
                var yearsSince = secondsSince/60/60/24/365
                
                
                const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`whois for ${user.username}`)
                    .setDescription(`${user.username}#${user.discriminator}`)
                    .setThumbnail(user.avatarURL())
                    .addField('ID', user.id, false)
                    // .addField('Created At', uac + ' ago',false)
                    
                   
                message.channel.send({embeds: [embed]})
            })
        }

    }
}