const Discord = require('discord.js')
module.exports = joke

function joke(command)
    {
        command.channel.send("*funne mode activate*");
        let rand = getRandom(1,3);
        
        let jokes = {
            1: "ok. so i have a really good joke\nwhy did the chicken cross the road?\nto get to the other side!!! i am funne",
            2: "where were you when " + command.author.username + " was die?\nI was at house eating dorito when phone ring\n"+ command.author.username + " is kil\nno.",
            3: "NOT FOUND"
        }
        command.channel.send(jokes[rand])
    }