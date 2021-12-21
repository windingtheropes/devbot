const Discord = require('discord.js')
const getTimePassed = require('../utils/getTimeFromTimestamp')
module.exports = {
    name: "whois",
    miniDescription: 'Get information about a user.',
    description: 'Get information about a user.',
    usage: '[query]',
    commands: ['whois'],
    callback: (message, args, text, client, prefix) => {
        var query = args.join(' ')

        var query = args.join(' ') // user
        if (!query) {
            getInfo(message.author, client.guilds.cache.get(message.guild.id).members.cache.get(message.author.id))
        }
        else if (query.startsWith('<@') && query.endsWith('>')) { // mention
            query = query.replace(/[<@!>]/g, '')
            const user = client.users.cache.get(query)
            const guildUser = client.guilds.cache.get(message.guild.id).members.cache.get(query)
            getInfo(user, guildUser)

        }
        else if (Number(query)){ // user id
            const user = client.users.cache.get(query)
            if(!user) return message.reply({ content: `Could not find user. The user might not be cached yet, in which case you should use ${`${'`'}${prefix}whois @user${'`'}`}`, allowedMentions: { repliedUser: false } })
            const guildUser = client.guilds.cache.get(message.guild.id).members.cache.get(query)
            getInfo(user, guildUser)
        }
        else if (query.charAt(query.length - 5) === "#") { // user#discrim
            const username = query.split('#')[0]
            const tag = query.split('#')[1]
            const user = client.users.cache.find(user => user.username.toLowerCase() === username.toLowerCase() && user.discriminator === tag)
            if(!user) return message.reply({ content: `Could not find user. The user might not be cached yet, in which case you should use ${`${'`'}${prefix}whois @user${'`'}`}`, allowedMentions: { repliedUser: false } })
            const guildUser = client.guilds.cache.get(message.guild.id).members.cache.get(user.id)
            getInfo(user, guildUser)
        }
    

        function getInfo(user, guildUser) {

            if (!user || !guildUser) {
                return message.reply({ content: `Could not find user. The bot must share a server with the requested user.`, allowedMentions: { repliedUser: false } })
            }
           
            const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`whois ${user.username}`)
                if(guildUser.displayName != user.username){embed.addField('Server Display Name', guildUser.displayName)}
                embed
                .setDescription(`${user.username}#${user.discriminator}`)
                .setThumbnail(user.avatarURL())
                .addField('Avatar URL', user.avatarURL())
                .addField('ID', user.id, false)
                .addField('Account Creation Date', `${getTimePassed(Date.now() - user.createdAt)} ago (${new Date(user.createdAt).toUTCString()})`)
               .addField(`Joined ${message.guild.name} at`, `${getTimePassed(Date.now() - guildUser.joinedAt)} ago (${new Date(guildUser.joinedAt).toUTCString()})`)
              
            return message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
        }


    }
}

// cannot get avatar url from guild member and cannot get joined at from client user





