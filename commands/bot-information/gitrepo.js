const { SlashCommandBuilder } = require('@discordjs/builders')
const { Permissions } =  require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('gitrepo')
        .setDescription('Replies with the official GitHub repository link.'),
    async execute(interaction, client) {
        await interaction.reply({content: 'https://github.com/windingtheropes/devbot', ephemeral: true});
    }
}