const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slowmode')
        .setDescription('Configure slowmode in the current channel')
        .addBooleanOption(option => 
            option.setName('disabled')
                .setDescription("Turn off slowmode entirely.")
                .setRequired(false))
        .addChannelOption(option => 
            option.setName('channel')
                .setDescription("The channel to apply slowmode to, left blank will apply to the current channel.")
                .setRequired(false))
        // .addIntegerOption(option => 
        //     option.setName('seconds')
        //         .setDescription("Slowmode in seconds.")
        //         .addChoices(['5 Seconds', 5], ['10 Seconds', 1], ['15 Seconds', 15], ['30 Seconds', 30])
        //         .setRequired(false))
                ,
    async execute(interaction) {
        const channel = interaction.channel;
        const disabled = interaction.options.getBoolean('disabled')
        const num2 = interaction.options.getInteger('num2')
        interaction.reply(getRandom(num1, num2).toString())
    }
        
}