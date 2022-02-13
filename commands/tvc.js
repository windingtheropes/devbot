const { SlashCommandBuilder } = require('@discordjs/builders')

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
                .setRequired(false)),
    async execute(interaction) {
        const tvcschema = require('../schemas/tempvoicechat-schema.js')
        const mongo = require('../utils/mongo.js')

        // !tempchat <limit> <name>

        const name = await interaction.options.getString('name')
        const limit = await interaction.options.getNumber('limit') || 0
        if (limit > 100) {
            return interaction.reply({content: "The limit cannot be greater than 100.", ephemeral: true})
        }

        //create a channel then log the channel id to the database

        const channel = await interaction.guild.channels.create(name, {
            type: 'GUILD_VOICE',
            userLimit: limit
        })

        const cid = channel.id
        const gid = interaction.guild.id

        await mongo().then(async (mongoose) => {
            try {
                await tvcschema.findOneAndUpdate(
                    {
                        _id: gid
                    },
                    {
                        $push: {
                            channels: [cid]
                        }
                    },
                    {
                        upsert: true
                    })
                interaction.reply({ content: `Created a temporary voice chat ${'`' + channel.name + '`'} ${+ limit > 0 ? `with a limit of ${limit} user${limit > 1 ? 's' : ''}` : ''}.` })
                return

            } finally {
               
            }
        })

    }
}