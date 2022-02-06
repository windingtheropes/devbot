const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const getTimePassed = require('../utils/getTimeFromTimestamp')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('whois')
        .setDescription('Gets information about a user. Leave the query blank to get information about yourself.')
        .addUserOption(option => 
            option.setName('query')
                .setDescription("The user you'd like to get information about.")
                .setRequired(false)),
    async execute(interaction, client) {
        var query = interaction.options.getUser('query')
        
        if (!query) {
            getInfo(interaction.user, client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.user.id))
        }
        else {
            const user = client.users.cache.get(query.id)
            const guildUser = client.guilds.cache.get(interaction.guild.id).members.cache.get(query.id)
            getInfo(user, guildUser)
        }
    

        async function getInfo(user, guildUser) {
            console.log(user)
            if (!user || !guildUser) {
                return await interaction.reply({ content: `Could not find user. The bot must share a server with the requested user.`})
            }
           
            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`whois ${user.username}`)
                if(guildUser.displayName != user.username){embed.addField('Server Display Name', guildUser.displayName)}
                embed
                .setDescription(`${user.username}#${user.discriminator}`)
                .setThumbnail(user.avatarURL())
                .addField('Avatar URL', user.avatarURL())
                .addField('ID', user.id, false)
                .addField('Account Creation Date', `${getTimePassed(Date.now() - user.createdAt)} ago (${new Date(user.createdAt).toUTCString()})`)
               .addField(`Joined ${interaction.guild.name} at`, `${getTimePassed(Date.now() - guildUser.joinedAt)} ago (${new Date(guildUser.joinedAt).toUTCString()})`)
              
            return await interaction.reply({ embeds: [embed] })
        }
    }
}