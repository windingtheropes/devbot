const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    operatorsOnly: true,
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Evaluates a test'),
    async execute(interaction) {
        interaction.reply(`hi`)
    }   
}