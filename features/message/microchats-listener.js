const microchatsSchema = require('../../schemas/microchats-schema')
module.exports = {
    enabled:false,
    callback: async (message, client) => {
        const gid = message.guild.id;
        const channel = message.channel

        const serverData = await microchatsSchema.findOne({_id: gid})
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
                    var permoverwrites = []
                    const template = {}
                    serverData.chats.forEach(ch => {
                        if(ch.id === channel.id)
                        {
                            
                            ch.members.forEach(m => {
                                const t = template
                                t.id = id
                                t.allow = ['VIEW_CHANNEL']
                                permoverwrites.push(t)
                            })
                        }
                    })
                    const t = template
                    t.id = gid
                    t.deny = ['VIEW_CHANNEL']
                    permoverwrites.push(t)
                    console.log(permoverwrites)
                    channel.overwritePermissions(permoverwrites)
                    
                }
            }
        }
    }
}