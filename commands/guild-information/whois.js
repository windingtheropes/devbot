const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const getTimePassed = require('../../utils/getTimeFromTimestamp')

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
                return await interaction.reply({ content: `Could not find user.`, ephemeral: true})
            }   
            const pres = guildUser.presence
            var clientStatus
            if(pres)
            {
                clientStatus = guildUser.presence.clientStatus
            }

            var presenceString = `${!clientStatus ? 'offline' : `${clientStatus.desktop ? `Desktop: ${clientStatus.desktop}` : ''}${clientStatus.web ? `\nWeb: ${clientStatus.web}` : ''}${clientStatus.mobile ? `\nMobile: ${clientStatus.mobile}` : ''}`}`
            if(!presenceString) presenceString = 'offline'
            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setAuthor({name: user.username, iconURL: user.displayAvatarURL({dynamic:true})})
                .setTitle(`whois ${user.username}`)
                if(guildUser.displayName != user.username){embed.addField('Server Display Name', guildUser.displayName)}
                embed
                .setDescription(`${user.tag} (<@!${user.id}>)`)
                .setThumbnail(user.displayAvatarURL({dynamic:true}))
                .addFields(
                    {name: 'Presence', value: presenceString},
                    {name: 'Avatar URL', value: user.displayAvatarURL({dynamic:true})},
                    {name: 'Account Creation Date', value: `${new Date(user.createdAt).toUTCString()}`},
                    {name: `Joined ${interaction.guild.name}`, value:  `${new Date(guildUser.joinedAt).toUTCString()}`}
                    )
               
                .setFooter({text: `User ID: ${user.id}`})
              
            return await interaction.reply({ embeds: [embed] })
        }
    }
}