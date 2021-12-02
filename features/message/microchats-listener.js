const microchatsSchema = require('../../schemas/microchats-schema')
module.exports = {
    enable:false,
    callback: async (message, client) => {
        // const guildId = message.guild.id;
        // const channelId = message.channel.id;

        // const serverData = microchatsSchema.findOne({_id: guildId})

        // if(!serverData) 
        // {
        //     const newServerData = new microchatsSchema({
        //         _id: guildId,
        //         categoryId: cat.id,
        //         chats: []
        //     })
        //     newServerData.save()
        // }
        // else
        // {
        //     const channelData = serverData.chats.find(ch => ch.id === channelId)
        //    if(!channelData)
        //    {
        //       return 
        //    }
        //    if(message.content.startsWith('<@') && message.content.endsWith('>'))
        //    {
        //        const mentionId = message.content.replace('<@', '').replace('>', '')
        //        const channel = message.channel
        //        console.log(channel)

        //    }
        // }
    }
}