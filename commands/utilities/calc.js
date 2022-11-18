const { SlashCommandBuilder } = require('@discordjs/builders')
const math = require('mathjs')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('calc')
        .setDescription('Evaluates a mathmatical expression.')
        .addStringOption(option => 
            option.setName('expression')
                .setDescription("The expression to evaluate.")
                .setRequired(false)),
    async execute(interaction) {
        const exp = interaction.options.getString('expression')
        interaction.reply(`(${exp}) = ${math.evaluate(exp).toString()}`)
    }
        
}