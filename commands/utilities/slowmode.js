const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js')

module.exports = {
    permissions: PermissionFlagsBits.ManageChannels,
    data: new SlashCommandBuilder()
        .setName('slowmode')
        .setDescription('Configure slowmode in the current channel')
        .addIntegerOption(option => 
            option.setName('disable')
                .setDescription("Disable slowmode in the selected channel.")
                .addChoices({name: "Yes", value: 1})
                .setRequired(false))
        .addChannelOption(option => 
            option.setName('channel')
                .setDescription("The channel to apply slowmode to, left blank will apply to the current channel.")
                .setRequired(false))
        .addIntegerOption(option => 
            option.setName('seconds')
                .setDescription("Slowmode in seconds.")
                .addChoices({ name: '5 Seconds', value: 5 }, { name: '10 Seconds', value: 10 }, { name: '15 Seconds', value: 15 }, { name: '30 Seconds', value: 30 })
                .setRequired(false))
        .addIntegerOption(option => 
            option.setName('minutes')
                .setDescription("Slowmode in minutes.")
                .addChoices({ name: '1 Minute', value: 1 }, { name: '2 Minutes', value: 2 }, { name: '5 Minutes', value: 5 }, { name: '10 Minutes', value: 10 }, { name: '15 Minutes', value: 15 }, { name: '30 Minutes', value: 30 })
                .setRequired(false))
        .addIntegerOption(option => 
            option.setName('hours')
                .setDescription("Slowmode in hours.")
                .addChoices({ name: '1 Hour', value: 1 }, { name: '2 Hours', value: 2 }, { name: '6 Hours', value: 6 })
                .setRequired(false))
        .addIntegerOption(option => 
            option.setName('serverwide')
                .setDescription("Apply settings to all text channels in the server.")
                .addChoices({name: "Yes", value: 1})
                .setRequired(false))
                ,
    async execute(interaction, client) {
        const channel = (() => {
            if(interaction.options.getChannel('channel')) {
                return interaction.options.getChannel('channel')
            }
            else {
                return interaction.channel
            }
        })()
        if(channel.type != ChannelType.GuildText) {
            return await interaction.reply({content: "Must be a text channel.", ephemeral: true})
        }

        // Disable slowmode altogether
        const disabled = interaction.options.getInteger('disable') == 1
        // Server wide
        const serverwide = interaction.options.getInteger('serverwide') == 1

        // this function will automatically apply slowmode settings to either the channel or the server depending on settings
        function setSlowmode(s) {
            if(serverwide) {
                const guildTextChannels = client.guilds.cache.get(interaction.guild.id).channels.cache.filter(c => c.type == ChannelType.GuildText)
                guildTextChannels.forEach(c => {
                    c.setRateLimitPerUser(s)
                })
            }
            else {
                channel.setRateLimitPerUser(s)
            }
        }

        // delays
        const seconds = interaction.options.getInteger("seconds")
        const minutes = interaction.options.getInteger("minutes")
        const hours = interaction.options.getInteger("hours")

        if(disabled == true) {
            setSlowmode(0)
            return await interaction.reply({content: `Disabled slowmode ${serverwide ? "serverwide." : channel.id != interaction.channel.id ? 'in ' + '<#' + channel.id + '>' : ""}`, ephemeral: true})
        }
        if(!seconds && !minutes && !hours) {
            return await interaction.reply({content: "Must specify a slowmode delay.", ephemeral: true})
        }

        // converts the delay to seconds
        const delaySeconds = (() => {
            if(seconds) {
                return seconds
            }
            else if(minutes) {
                return minutes * 60
            }
            else if(hours) {
                return hours * 60 * 60
            }
        })()    
        
        setSlowmode(delaySeconds)
        return await interaction.reply({content: `Set slowmode delay to ${seconds ? seconds : minutes ? minutes : hours ? hours : ""} ${seconds ? "seconds" : minutes ? "minutes" : hours ? "hours" : ""} ${serverwide ? "serverwide." : channel.id != interaction.channel.id ? 'in ' + '<#' + channel.id + '>' : ""}`, ephemeral: true})
    }
        
}