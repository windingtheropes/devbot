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
    }
    else 
    {
        const chat = await message.guild.channels.create(chatName, {type: 'text', parent: serverData.categoryId, permissionOverwrites: [{id: message.author.id, allow: ['VIEW_CHANNEL']}, {id: gid, deny: ['VIEW_CHANNEL']}]})
        microchatsSchema.findOneAndUpdate({_id: gid}, {$push: {chats: {name: chatName, id: chat.id, members: [ `${message.author.id}` ]}}}, {new: true}, (err, doc) => {
            if(err) console.log(err)
        })
    }
        
        message.channel.send(`Created chat ${chatName}`)
    return 
}