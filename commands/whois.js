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
        
        const query = interaction.options.getUser('query')
        if (!query) {
            getInfo(interaction.user, client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.user.id))
        }
        else {
            const user = query
            const guildUser = client.guilds.cache.get(interaction.guild.id).members.cache.get(query.id)
            getInfo(user, guildUser)
        }
    

        async function getInfo(user, guildUser) {
            if (!user || !guildUser) {
                return await interaction.reply({ content: `Could not find user. The bot must share a server with the requested user.`})
            }   
            const presence = guildUser.presence.clientStatus

            var presenceString = `${presence.desktop ? `Desktop: ${presence.desktop}` : ''}${presence.web ? `\nWeb: ${presence.web}` : ''}${presence.mobile ? `\nMobile: ${presence.mobile}` : ''}`
            if(!presenceString) presenceString = 'offline'
            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`whois ${user.username}`)
                if(guildUser.displayName != user.username){embed.addField('Server Display Name', guildUser.displayName)}
                embed
                .setDescription(`${user.tag} (<@!${user.id}>)`)
                .setThumbnail(user.avatarURL())
                .addField('Presence', presenceString)
                .addField('Avatar URL', user.avatarURL())
                .addField('Account Creation Date', `${getTimePassed(Date.now() - user.createdAt)} ago (${new Date(user.createdAt).toUTCString()})`)
                .addField(`Joined ${interaction.guild.name}`, `${getTimePassed(Date.now() - guildUser.joinedAt)} ago (${new Date(guildUser.joinedAt).toUTCString()})`)
                .setFooter({text: `User ID: ${user.id}`})
              
            return await interaction.reply({ embeds: [embed] })
        }
    }
}