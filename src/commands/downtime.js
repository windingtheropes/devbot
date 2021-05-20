const Discord = require('discord.js')

const {operators} = require('../config.json')
module.exports = downtime
// !downtime set at 12:35 PM EST idle
//    command  0  1  2     3  4   5

// !downtime set in 5 m idle
//   command  0   1 2 3  4
var time;
var inTime;
var goal;

function sendStatus(status)
{
		switch(status) // what is status type
		{
						case 'idle':
							return [time, status]
							break;
						case 'dnd':
							return [time, status]
							break;
						case 'online':
							return [time, status]
							break;
						default:
							return 'error'
							break;
		}
		
}

function formatTime(h, m)
{
	
	let tod
	if(h >= 12)
	{
		
		if(h === 12)
		{
			h = h
			if(m >= 0)
			{
				tod = 'PM'
			}
			else
			{
				
			}
		}
		else
		{
			h = h - 12
			if(m >= 0)
			{
				tod = 'PM'
			}
			else
			{
				
			}
		}
		
	}
	else
	{
		tod = 'AM'
		
	}
	if(m < 10)
	{
		m = `0${m}`
	}
	else
	{

	}
		return `${h}:${m} ${tod}`
	}
	

function downtime(args, command)
{
    if(operators.indexOf(command.author.id) > -1)
	{
        switch (args[0].toLowerCase()) {
            case 'clear':
				
				return 'clear'
				break;
			case 'set':
				
				switch(args[1].toLowerCase())
				{
					case 'in': // ex: in 5 minutes
					
					inTime = Number(args[2])
					
					switch(args[3].toLowerCase())
					{
						case 'm':
							inTime = inTime * 60000
							goal = +new Date + inTime
							time = formatTime(new Date(goal).getHours(),new Date(goal).getMinutes())
							
							return sendStatus(args[4])
							break;
						case 'h':
							inTime = inTime * 3600000
							goal = +new Date + inTime
							time = formatTime(new Date(goal).getHours(),new Date(goal).getMinutes())
							
							return sendStatus(args[4])
							break;
					}
					
					case 'at': // ex: at 12:35 pm est
					time = `${args[2]} ${args[3]} ${args[4]}` // 13:35 PM EST
					
					return sendStatus(args[5])
						break;
					default:
						break;	
				}
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