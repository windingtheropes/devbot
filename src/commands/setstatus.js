const Discord = require('discord.js')

const {operators} = require('../config.json')
module.exports = setstatus
var stage = 0
var type = ''
var status = ''
var textStatus = ''
var open = false
// 0 = no
// 1 = watching/listening/playing/clear
// 2 = only applies to watching/listening/playing: status [online/dnd/idle]
// 3+ = the status

function reset()
{
	stage = 0
	type = ''
	status = ''
	textStatus = ''
	open = false
}
function setstatus(args, command, client)
{
	command.delete()
	reset()
    if(operators.indexOf(command.author.id) > -1)
	{
		if(!parse(args, command, client))
		{

		}
		else
		{
			command.channel.send("There was an error.")
		}
	}
    else
	{
		command.channel.send("Insufficient permissions.")
	}
}

function isOneOf(str, list)
{
	if(list.indexOf(str) > -1)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function parse(args, command, client)
{
	args.forEach(element => {
		stage = stage + 1
		if(stage == 1)
		{
			
			if(isOneOf(element, ['watching','listening','playing']))
			{
				type = element
			}
			else if(element === 'clear')
			{
				type = element
				return updateStatus(['clear'], client)
			}
			else
			{
				return true;
			}
		}
		else if(stage == 2)
		{
			status = element
		}
		else if(stage >= 3)
		{
			if(!open && element.startsWith('"'))
			{
				if(element.endsWith('"'))
				{
					element = element.substring(1)
					element = element.slice(0, -1)
					textStatus = `${element}`
					return updateStatus([type, status, textStatus], client)
				}
				else
				{
					element = element.substring(1)
					textStatus = `${element}`
					open = true
				}

			}
			else if(open && !element.startsWith('"') && !element.endsWith('"'))
			{	
				textStatus = `${textStatus} ${element}`
			}
			else if(open && element.endsWith('"'))
			{	
					element = element.slice(0, -1)
					textStatus = `${textStatus} ${element}`
					return updateStatus([type, status, textStatus], client)
				
				
			}
			
		}
	});
}

function updateStatus(data, client){
	switch(data[0])
	{
		
		case 'clear':
			client.user.setPresence({ status: 'online', activity: null })
			break;
		case 'watching':
		case 'listening':
		case 'playing':
			switch(data[1])
			{
				case 'dnd':
				case 'idle':
				case 'online':
					client.user.setPresence({
						status: data[1],
						activity: {
							name: data[2],
							type: data[0].toUpperCase(),
						}
					})
					break;
				default:
					return true;
					break;
			}
			break;
		default:
			return true;
			break;
	}
}