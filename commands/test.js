const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    operatorsOnly: true,
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Evaluates a test'),
    async execute(interaction, client) {
        interaction.reply(`hi`)
    }   
}