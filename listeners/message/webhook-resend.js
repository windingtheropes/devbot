module.exports = {
    enabled: false,
    callback: async (message) => {
        //testing functionality for webhooks and messages
        // this will probably be used in the future in some form for censoring messages and a pin archive.
        if(message.author.bot) return
        const { Client, Intents, WebhookClient } = require("discord.js");
        const oldMessage = message
        const avatarURL = message.author.avatarURL()
        await message.delete()

        message.channel.createWebhook('resend', {
        })
            .then(async webhook => {
                await webhook.send({
                    content: oldMessage.content,
                    username: oldMessage.author.username,
                    avatarURL: avatarURL,
                })
                await webhook.delete()
            })
            .catch(console.error);
    }
}