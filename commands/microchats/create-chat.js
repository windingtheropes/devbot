const { Permissions } = require("discord.js");
const mongo = require('../../utils/mongo')
const microchatsSchema = require('../../schemas/microchats-schema')


module.exports = {
    listed: true,
    commands: 'chat',
    callback: async (message, args, text, client) => {
        if(args.length < 1) return message.channel.send('Please specify a chat name.')
        let chatName = args.join(' ');
        if(chatName.length >= 32) return message.channel.send('Chat name must be 32 characters or less.')
        let everyoneRole = message.guild.roles.cache.find(r => r.name === '@everyone');
        const guildId = message.guild.id
    let categoryId

        
            

        const serverData = await microchatsSchema.findOne({_id: guildId})
        if(!serverData)
        {
            message.guild.channels.create("Chats", {
                type: 'category', permissionOverwrites: [{id: everyoneRole.id, deny: ['VIEW_CHANNEL']}]}).then(async cat => {
                    const newServerData = new microchatsSchema({
                        _id: guildId,
                        categoryId: cat.id,
                        chats: []
                    })
                    categoryId = cat.id
                    await newServerData.save()
                    

                })
        }
        else
        {
        
        }

        
        message.guild.channels
            .create(chatName, {
                type: 'text',
                parent: categoryId,
                lockPermissions: false
            }).then(async channel =>{
                const newChat = {
                    "id": channel.id,
                    "members": [message.author.id.toString()]
                }
                serverData.chats.push(newChat)
                await serverData.save()
                message.channel.send(`${message.author.username} created a new chat: <#${channel.id}>`);
            })

            
            
          
    }
}