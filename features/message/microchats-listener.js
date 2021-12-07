const microchatsSchema = require('../../schemas/microchats-schema')
module.exports = {
    callback: async (message, client) => {
        const guildId = message.guild.id;
        const channel = message.channel

        const serverData = await microchatsSchema.findOne({_id: guildId})
        if(!serverData) 
        {
            // it won't add the guild to the database, will only add if the user runs chat command
            return
        }
        else
        {
            if(serverData.chats.find(ch => ch.id === channel.id))
            {
                if(message.content.startsWith('<@!') && message.content.endsWith('>'))
                {
                    const id = message.content.replace('<@!', '').replace('>', '')
                    
                }
            }
        }
    }
}