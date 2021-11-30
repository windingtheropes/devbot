const { Permissions } = require("discord.js");
const mongo = require('../../utils/mongo')
const microchatsSchema = require('../../schemas/microchats-schema')


module.exports = {
    listed: true,
    commands: 'chat',
    callback: async (message, args, text, client) => {
        if(args.length < 1) return message.channel.send('Please specify a chat name.').then((msg) => setTimeout(msg.delete(), 5000));
        let chatName = args.join(' ');
        if(chatName.length >= 32) return message.channel.send('Chat name must be 32 characters or less.').then((msg) => setTimeout(msg.delete(), 5000));
        let everyoneRole = message.guild.roles.cache.find(r => r.name === '@everyone');
        const guildId = message.guild.id
    let categoryId
        const serverData = await microchatsSchema.findOne({_id: guildId})
        if(!serverData)
        {
            message.guild.channels
            .create("Chats", {
                type: 'category'}).then((cat) => {
                    const newServerData = new microchatsSchema({
                        _id: guildId,
                        categoryId: cat.id,
                        chats: []
                    })
                    newServerData.save()
                    categoryId = cat.id
                })
        }
        else
        {
            categoryId = serverData.categoryId
        }


        message.guild.channels
            .create(chatName, {
                type: 'text',
                parent: categoryId,
                permissionOverwrites: [
                    {
                      id: everyoneRole.id,
                      deny: ['VIEW_CHANNEL'],
                   },
                   {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL'],
                 },
                ]
            }).then(channel => {
                //TODO: add the channel to the mongodb database for the server
                const newChat = {
                    "id": channel.id,
                    "members": [message.author.id.toString()]
                }
                const serverData = microchatsSchema.findOne({_id: guildId})
                serverData.chats.push(newChat)
                serverData.save()
                message.channel.send(`${message.author.username} created a new chat: <#${channel.id}>`);
            })

            
            
          
    }
}