const metricsSchema = require('../../schemas/guildmetrics-schema')
const mongo = require('../../utils/mongo.js')
const mongoose = require('mongoose')
module.exports = {
    callback: async (message, client) => {
        
        await mongo().then(async (mongoose) => {
            try {
                const serverData = await metricsSchema.findOne({_id: message.guild.id})
                if(!serverData) return
                if(!serverData.enabled) return 
                const userData = serverData[message.author.id]
                if(!userData){
                    serverData.metrics[message.author.id] = {}
                    serverData.metrics[message.author.id].messages = 1
                }
                else
                {
                    serverData.metrics[message.author.id].messages++
                }
                console.log(serverData)
                await serverData.save()

            } finally {
                // mongoose.connection.close()
            }
        })

        
    }
}