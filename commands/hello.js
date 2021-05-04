const Discord = require('discord.js')
const getRandom = require('./get_random')
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