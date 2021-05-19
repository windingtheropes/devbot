const Discord = require('discord.js')
const Client = new Discord.Client()
const {operators} = require('../config.json')
module.exports = downtime

function downtime(args, command)
{
    if(operators.indexOf(command.author.id) > -1)
	{
        command.channel.send("you are permitted")
	}
    else
	{
		command.channel.send("Insufficient permissions.")
	}
}