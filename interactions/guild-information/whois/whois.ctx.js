const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js')
const whois = require("./whois.js")

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('User information')
        .setType(ApplicationCommandType.User),
    async execute(interaction, options, client) {
        if(!interaction.isUserContextMenuCommand()) return
        const user = interaction.targetUser;
        
        whois(interaction, user, client)
    }   
}