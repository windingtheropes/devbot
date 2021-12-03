const { Permissions } = require("discord.js");
const mongo = require('../../utils/mongo')
const microchatsSchema = require('../../schemas/microchats-schema')


module.exports = {
    listed: true,
    commands: 'chat',
    callback: async (message, args, text, client) => {
        if(args.length < 1) return message.channel.send('Please specify a chat name.')
        var chatName = args.join(' ');
        if(chatName.length >= 32) return message.channel.send('Chat name must be 32 characters or less.')
        var everyoneRole = message.guild.roles.cache.find(r => r.name === '@everyone');
        const guildId = message.guild.id
        
        await checkData(guildId, message, chatName)
        
            

       
            
          
    }
}

async function checkData(gid, message, chatName)
{
    const serverData = await microchatsSchema.findOne({_id: gid})
    if(!serverData)
    {
        console.log("No data found for server " + gid)
                // const category = await message.guild.channels.create("Chats", {
                //     type: "category",
                //     permissionOverwrites: [
                //         {
                //             id: message.guild.id,
                //             deny: ['VIEW_CHANNEL']
                //         },
                //     ]})
                // console.log(category.id)
                const newServerData = new microchatsSchema({
                    _id: gid,
                    categoryId: '0',
                    chats: []
                })
                newServerData.save()
                console.log("Created new server data for server " + gid)
        
            }
    else
    {
        console.log("Data found for server " + gid)
        console.log(serverData)
    }
    return 
}