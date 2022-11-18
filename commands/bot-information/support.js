const { SlashCommandBuilder } = require('discord.js')
module.exports = {
    enabled: false,
    data: new SlashCommandBuilder()
        .setName('support')
        .setDescription('Replies with an invite to the official devbot support server.'),
    async execute(interaction, options) {
        await interaction.reply({content: 'https://discord.gg/VHdTt3KUZQ', ephemeral: true});
    }
}