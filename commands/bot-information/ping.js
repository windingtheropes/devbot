const { SlashCommandBuilder } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong.'),
    async execute(interaction, client) {
        await interaction.reply({ content: `🏓 Discord API Ping: ${client.ws.ping}` });
    }
}