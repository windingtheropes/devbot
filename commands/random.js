const { SlashCommandBuilder } = require('@discordjs/builders')
const math = require('mathjs')
const getRandom = require('../utils/getRandom.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('random')
        .setDescription('Gets a random number from a range.')
        .addIntegerOption(option => 
            option.setName('num1')
                .setDescription("The first number in the range.")
                .setRequired(true))
        .addIntegerOption(option => 
            option.setName('num2')
                .setDescription("The second number in the range.")
                .setRequired(true)),
    async execute(interaction) {
        const num1 = interaction.options.getInteger('num1')
        const num2 = interaction.options.getInteger('num2')
        interaction.reply(getRandom(num1, num2).toString())
    }
        
}