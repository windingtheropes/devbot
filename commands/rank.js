const messageCountSchema = require('../schemas/message-count-schema')
const mongo = require('../utils/mongo')

module.exports = {
    commands: 'rank',
    callback: async (message, args, text, client, prefix) => {

        const { author, guild } = message

   
        await mongo().then(async mongoose => {
            try {
                const guildAll = await messageCountSchema.find({guildId: guild.id})
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
            

                const userRank = leaderboard.find(o => o[0] === author.id);
                if(!userRank) return
                const placement = userRank[2].toString()
                var suffix
                if(placement.endsWith('0'))
                {
                    suffix = 'th'
                }
                else if(placement.endsWith('1'))
                {
                    suffix = 'st'
                }
                else
                {
                    suffix = 'nd'
                }
                return message.reply(`You're in ${userRank[2]}${suffix} place with ${userRank[1]} messages sent.`)         
            }
            finally {
                // mongoose.connection.close()
            }
        })
    }
}