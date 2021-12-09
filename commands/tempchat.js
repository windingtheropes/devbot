const tvcschema = require('../schemas/tempvoicechat-schema.js')
const mongo = require('../utils/mongo.js')
module.exports = {
    commands: ['tvc'],
    minArgs: 2,
    description: 'Create a temporary voice chat. ',
    exampleUsage: ['tvc 0 temporary'],
    miniDescription: 'Create a temporary voice chat.',
    usage: '<user limit> <channel name>',
    callback: async (message, args, text, client) => {
        // !tempchat <limit> <name>
        
       const limit = args[0]
        args.shift()
        
       if(!limit.typeof === 'number') {
           return message.channel.send("Please enter a valid number of users or zero for unlimited.")
       }

       if(limit > 100)
       {
           return message.channel.send("The limit cannot be greater than 100.")
       }

       

       
    //create a channel then log the channel id to the database

    const channel = await message.guild.channels.create(args.join(' '), {
        type: 'voice',
        userLimit: limit
    })

    const cid = channel.id
    const gid = message.guild.id
    
    await mongo().then(async (mongoose) => {
        try {
            await tvcschema.findOneAndUpdate(
                {
                        _id: gid
                    }, 
                    {$push: {
                        channels: [cid]
                    }
                    }, 
                    {
                        upsert: true
                    })
        return
            
        } finally {
            mongoose.connection.close()
        }
    })
        
    }
   
    





       
       
    
}