const { SlashCommandBuilder } = require('@discordjs/builders')
const { tempvc } = require("../models/index")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('tempvc')
        .setDescription('Creates a temporary voice chat.')
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
        // !tempchat <limit> <name>

        // The requested parent category
        const p = await interaction.options.getChannel('parent')
        // Make sure the requested parent is a category, and exists, otherwise just make the channel under the current category
        const pid = (() => {
            if(!p) return interaction.channel.parentId
            if(p) {
                if(p.type === 'GUILD_CATEGORY') return p.id
                else return interaction.channel.parentId
            }
        })()
        
        const name = await interaction.options.getString('name')
        const limit = await interaction.options.getNumber('limit') || 0
        if (limit > 100) {
            return interaction.reply({ content: "The user limit can't be more than 100.", ephemeral: true })
        }

        //create a channel then log the channel id to the database
        const channel = await interaction.guild.channels.create(name, {
            type: 'GUILD_VOICE',
            userLimit: limit,
            parent: pid
        })

        const cid = channel.id
        const gid = interaction.guild.id

        await tempvc.upsert({
            guildId: gid,
            channelId: cid
        });

        interaction.reply({ content: `Created temporary voice chat ${'`' + channel.name + '`'}${limit > 0 ? ` with a limit of ${limit} user${limit > 1 ? 's' : ''}` : ''}` })
        return
    }
}