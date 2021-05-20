const Discord = require('discord.js')

const {operators} = require('../config.json')
module.exports = setstatusCommand

function setstatusCommand(args, command, client)
{
    if(operators.indexOf(command.author.id) > -1)
	{
		switch(args[0])
		{
			case 'playing':
				setStatus(args[0])
				break;
			case 'listening':
				setStatus(args[0])
				break;
			case 'watching':
				setStatus(args[0])
				break;
			default:
				break;
		}
	}
    else
	{
		command.channel.send("Insufficient permissions.")
	}
}

function setStatus(type)
{
	args.splice(0,1)

}