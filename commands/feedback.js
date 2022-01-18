const Discord = require('discord.js')
var feedbackChannel
if(require('../config/config.json').feedbackChannel)
try {
    feedbackChannel = require('../config/config.json').feedbackChannel
} catch {
    feedbackChannel = process.env.FEEDBACKCHANNEL
}
module.exports = {
    commands: ['suggest', 'feedback'],
    minArgs: 1,
    callback: (message, args, text, client) => {
        if(!feedbackChannel) return
        
        const feedback = args.join(' ')
        
        const avatarURL = message.author.avatarURL()
        
        const embed = new Discord.MessageEmbed()
        .setTitle(`Feedback from ${message.author.tag} (${message.author.id})`)
        .setThumbnail(avatarURL)
        .setDescription(feedback)
        client.channels.cache.get(feedbackChannel).send({embeds: [embed]})
    }   
}