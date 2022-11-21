const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js')
const { tempvc } = require("../models/index")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('tempvc')
        .setDescription('Creates a temporary voice chat.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageServer)
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The channel name.')
                .setRequired(true))
        .addNumberOption(option =>
            option.setName('limit')
                .setDescription('The channel user limit.')
                .setRequired(false))
        .addChannelOption(option =>
            option.setName('parent')
                .setDescription("Parent category."))
    ,
    async execute(interaction) {
        const {guild} = interaction
        // Make sure the requested parent is a category, and exists, otherwise just make the channel under the current category
        const parent = await (async () => {
            const p = await interaction.options.getChannel('parent')
            if(!p) return interaction.channel
            if(p) {
                if(p.type === 'GUILD_CATEGORY') return p
                else return interaction.channel
            }
        })()
        
        const name = await interaction.options.getString('name')
        const limit = await interaction.options.getNumber('limit') || 0
        if (limit > 100) {
            return interaction.reply({ content: "The user limit can't be more than 100.", ephemeral: true })
        }

        //create a channel then log the channel id to the database
        const channel = await interaction.guild.channels.create(name, {
            type: ChannelType.GuildVoice,
            userLimit: limit,
            parent: parent.id
        })

        await tempvc.upsert({
            guildId: guild.id,
            channelId: channel.id
        });

        interaction.reply({ content: `Created temporary voice chat ${'`' + channel.name + '`'}${limit > 0 ? ` with a limit of ${limit} user${limit > 1 ? 's' : ''}` : ''}` })
        return
    }
}