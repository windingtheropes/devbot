const Discord = require('discord.js')
const getRandom = require('./get_random')
module.exports = random 

function random(args, command)
    {
       if(args.length == 2)
       {
            var num1 = args[0];
            var num2 = args[1];
            command.channel.send(`${getRandom(num1,num2).toString()}`)
       } 
       else
       {
           command.channel.send("Please provide **two** numbers as a range for the random number to be generated within.")
       }
    }