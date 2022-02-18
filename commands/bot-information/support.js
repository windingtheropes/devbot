const { SlashCommandBuilder } = require('@discordjs/builders')
const { Permissions } =  require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('support')
        .setDescription('Replies with an invite to the official devbot support server.'),
    async execute(interaction, client) {
        await interaction.reply({content: 'https://discord.gg/VHdTt3KUZQ', ephemeral: true});
    }
}