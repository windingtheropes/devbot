const Discord = require('discord.js')
module.exports = poll

// Command: !poll multiple ;; Question goes here ;; :thumbs_up: Option 1 ;; :thumbs_down: Option 2 ;; :custom_emoji: Option 3 ;;

var embed
var data =   
	{
		items: [],
		temp: {
			emoij: '',
			msg: ''
		},
		eStage : 0, 
		stage : 0,  
		question : ''
	}

function resetData()
{
	embed = null
	embed = new Discord.MessageEmbed()
	embed
	.setColor('#0099ff')
    .setTitle('Poll')
	.setAuthor('devbot')
	data = {} // Clear data
	eCounts = {}
	eCounts2 = []
	data = // Reset Data
	{
		items: [],
		temp: {
			emoij: '',
			msg: ''
		},
		eStage : 0, 
		stage : 0,  
		question : ''
	}

}

function parse(args, command, type) // Returns nothing if no error, returns true with an error
{
	
	resetData()

		switch (type)
		{
		case 'multiple':
			args.splice(0, 1)

			args.forEach(element =>
			{
				if (element === ';;')
				{
					data.stage = data.stage + 1

					if (data.stage >= 2)
					{
						if (data.eStage >= 2)
						{
							data.items.push([data.temp.emoji, data.temp.msg])
							data.temp.msg = ''
							data.eStage = 0
						}

					}
				}
				else
				{
					if (data.stage === 1)
					{
						data.question = `${data.question} ${element}`
			
					}
					else if (data.stage >= 2)
					{

						data.eStage = data.eStage + 1

						if (data.eStage === 1)
						{

							data.temp.emoji = element

						}
						else if (data.eStage >= 2)
						{
							data.temp.msg = `${data.temp.msg} ${element}`
						}

					}

				}
			});


			data.items.forEach(element =>
			{
				data.question = `${data.question} \n${element[0]}: ${element[1]}`
			})
			
			break;

		case 'yesno':
			args.splice(0, 1)
			args.forEach(element =>
			{
				data.question = `${data.question} ${element}`
			})
			
			break;
		default:
			
			break;
		}
		

		if(type === 'multiple')
		{
			if(data.stage <= 1)
		{
			command.channel.send("Incomplete command.")
			return true;
		}

		}
		else
		{
			
		}
		
	}

function poll(args, command)
{
	resetData()
	
		switch(args[0])
		{
			case 'multiple':
				
				if(!parse(args, command, 'multiple'))
				{	
					embed.addField('Question', data.question, false)
					command.channel.send(embed).then(function (sentMessage)
					{
						data.items.forEach(element =>
						{
							sentMessage.react(element[0])
						})
						command.delete()
					});
				}
				else
				{
					command.channel.send("There was an error.")
				}
				break;
			case 'yesno':
				if(!parse(args, command, 'yesno'))
				{
					embed
                	.addField('Question', data.question, false)				
					command.channel.send(embed).then(function (sentMessage)
					{
						sentMessage.react('👍')
						sentMessage.react('👎')
						command.delete()
					});
					
				}
				else
				{
					command.channel.send("There was an error.")
				}

				break;
			default:
				command.channel.send("Please provide a proper poll type.")
				break;	
		}

	}