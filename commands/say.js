const { PermissionFlagsBits, SlashCommandBuilder } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Says what you say.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The name to send the message under.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message to send.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('avatar')
                .setDescription('The avatar for the message.')
        )
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to send the message in.')
        ),
    async execute(interaction) {
        const message = interaction.options.getString('message')
        const channel = interaction.options.getChannel('channel') || interaction.channel
        const name = interaction.options.getString('name')
        const avatar = interaction.options.getString('avatar')

        if (!(channel.type == 'GUILD_TEXT' || channel.type == 'GUILD_NEWS')) {
            return interaction.reply({ content: 'The channel type is not supported.', ephemeral: true })
        }

        const webhook = await (async () => {
            if(!channel)
            {
                return await interaction.channel.createWebhook(name, {
                    avatar: avatar || "",
                })
            }
            else {
                return await channel.createWebhook(name,{
                    avatar: avatar || "",
                    reason: "/say command"
                })
            }
        })()

        await webhook.send({ content: message })
        await interaction.reply({ content: `Sent '${message}' in <#${channel.id}>.`, ephemeral: true })

        await webhook.delete()
        // channel.send(message)
    }
}