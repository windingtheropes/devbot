const Discord = require('discord.js')
module.exports = poll

function poll(args, command)
{   
    command.delete()
    let message = ""
    args.forEach(element => {
        message = message + " " + element
    });
    command.channel.send(message).then(function(sentMessage) {
        sentMessage.react('👍')
        sentMessage.react('👎')
    });
}