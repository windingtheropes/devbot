const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const whois = require("./whois.js")
// const getTimePassed = require('../../utils/getTimeFromTimestamp')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('whois')
        .setDescription('Gets information about a user. Leave the query blank to get information about yourself.')
        .addUserOption(option => 
            option.setName('query')
                .setDescription("The user you'd like to get information about.")
                .setRequired(false)),
    async execute(interaction, options, client) {
        
        const query = interaction.options.getUser('query')

        whois(interaction, query, client)
    }
}