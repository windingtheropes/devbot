const { SlashCommandBuilder } = require('discord.js')
const { version, prerelease } = require('../../versioninfo.json')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('version')
        .setDescription('Gets the bot version.'),
    async execute(interaction) {
        await interaction.reply({ content: `Devbot version ${version}.\n${prerelease ? '**This is a pre-release version; expect bugs and instabilities.**' : ''}`})
    }
}
