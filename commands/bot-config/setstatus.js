const { SlashCommandBuilder, ActivityType } = require('discord.js')

module.exports = {
    operatorsOnly: true,
    data: new SlashCommandBuilder()
        .setName('setstatus')
        .setDescription(`Set the bot's status.`)
        .addStringOption(option => 
            option.setName("type")
                .setDescription("Activity type.")
                .addChoices({ name: "Playing", value: "playing" }, 
                            { name: "Listening", value: "listening"}, 
                            { name: "Watching", value: "watching" })
                .setRequired(true))
        .addStringOption(option => 
            option.setName("message")
                .setDescription("Status message.")
                .setRequired(true)),
        // .addStringOption(option => 
        //     option.setName("status")
        //         .setDescription("Bot status.")
        //         .addChoices({ name: "Online", value: 'online'}, 
        //                 { name: "Idle", value: 'idle'}, 
        //                 { name: "Do Not Disturb", value: 'dnd'}, 
        //                 { name: "Invisible", value: 'invisible'})
        //         .setRequired(true)),
    async execute(interaction, options, client) {
        const typeString = interaction.options.getString("type")
        const type = (() => {
            switch (typeString) {
                case 'playing':
                    return ActivityType.Playing
                case 'watching':
                    return ActivityType.Watching
                case 'listening':
                    return ActivityType.Listening
            }
        })()
        const message = interaction.options.getString("message")
        client.user.setActivity(message, { type });
        await interaction.reply({content: `Set the bot status to ${'`'}${interaction.options.getString("type")} ${message}${'`'}.`, ephemeral: true})
    }   
}