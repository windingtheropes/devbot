module.exports = {
    enabled: false,
    callback: async (message) => {
        // Working message resending with webhooks.
        // Keep in mind: this creates and recreates a webhook every time, easy to get limited and also slow down the process.
        // Ideally should have one webhook for all devbot webhook functionality.
        if (message.author.bot) return
        
        const {content, username} = message
        const avatarURL = message.author.avatarURL()
        await message.delete()

        const wh = await message.channel.createWebhook({
            name: 'Devbot Message Resend'
        })
        
        await wh.send({content, username, avatarURL})
        await wh.delete()

    }
}