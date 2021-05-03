const Discord = require('discord.js')
module.exports = hello

function hello(command)
    {
        let rand = getRandom(1,3);
    
        let greetings = {
            1:"yo yo yo",
            2:"hello!",
            3:"ello."
        }
        command.channel.send(greetings[rand])
    }