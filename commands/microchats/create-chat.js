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
        
        checkData(guildId, message, chatName)
        
            

       
            
          
    }
}

async function checkData(gid, message, chatName)
{
    const serverData = await microchatsSchema.findOne({_id: gid})
    if(!serverData)
    {
        //create a category then log the category in the database
        const category = await message.guild.channels.create(`Chats`, { type: 'category', permissionOverwrites: [{id: gid, deny: ['VIEW_CHANNEL']}] })
        const chat = await message.guild.channels.create(chatName, {type: 'text', parent:category.id})
        const newServerData = new microchatsSchema({            
            _id: gid,
            categoryId: category.id,
            chats: [{
                name: chatName,
                id: chat.id,
                members: [],
            }]
        })

        newServerData.save()
        message.channel.send(`Created chat ${chatName}`)


        // OLD CODE 
        // const category = await message.guild.channels.create("Chats", {
        //             type: "category",
        //             permissionOverwrites: [
        //                 {
        //                     id: message.guild.id,
        //                     deny: ['VIEW_CHANNEL']
        //                 },
        //             ]})
        //         console.log(category.id)
        //         const newServerData = new microchatsSchema({
        //             _id: gid,
        //             categoryId: '0',
        //             chats: []
        //         })
        //         newServerData.save()
        //         console.log("Created new server data for server " + gid)
    }
    else
    {
        console.log("Data found for server " + gid)
        console.log(serverData)
    }
    return 
}