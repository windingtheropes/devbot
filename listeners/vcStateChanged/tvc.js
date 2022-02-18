const mongo = require('../../utils/mongo.js')
const tvcschema = require('../../schemas/tempvoicechat-schema')
module.exports = {
    callback: async (oldm, newm, client) => {
        if(!oldm || !oldm.channel) return // only want leave events
                const guildId = oldm.guild.id
                const serverData = await tvcschema.findOne({_id: guildId})
        if(!serverData) return
        
            const guild = client.guilds.cache.get(guildId)
            const channel = guild.channels.cache.get(oldm.channel.id)

            if(!channel) return

            if(!serverData.channels.find(c => c === channel.id)) return

            let i =0
            channel.members.forEach(member => {
                i++
            })
            if(i === 0) 
            {
                channel.delete()
                serverData.channels.splice(serverData.channels.indexOf(channel.id), 1)
            }
            
            return serverData.save()
            
    }
}