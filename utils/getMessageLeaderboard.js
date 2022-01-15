const mongo = require('./mongo')
const messageCountSchema = require('../schemas/message-count-schema')

module.exports = async (guildId, limit) => {
    await mongo().then(async mongoose => {
        try {
            const guildAll = await messageCountSchema.find({guildId: guildId})
            const all = []
            guildAll.forEach(data => {
                all.push(data)
            })

            const leaderboard = []
            for(let i=0; i<10; i++){
                const place = i+1;
                if(all.length <= 0)
                {
                    break
                }
        
                const res = Math.max.apply(Math,all.map(function(o){return o.messageCount;}))
                const obj = all.find(function(o){ return o.messageCount == res; })

                leaderboard.push([obj.userId, obj.messageCount, place])
                all.splice(all.indexOf(obj), 1)
            }
            
            if(limit && Number(limit))
            {
                leaderboard.length = limit
            }
            
            return leaderboard         
        }
        finally {
            // mongoose.connection.close()
        }
    })
}
