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
var emojiCounts = []
function resetData()
{
	emojiCounts = []
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
	try
	{
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
		let dupe = false
		data.items.forEach(emoji => {
			if(emojiCounts.indexOf(emoji[0]) > -1)
			{
				command.channel.send("Duplicate emoji detected.")
				dupe = true
			}
			else
			{
				emojiCounts.push(emoji[0])
			}
		})
		if(dupe)
		{
			return true;
		}
	}
	catch(error)
	{
		return true;
	}
		
	}

function poll(args, command)
{
	resetData()
		try
		{
			switch(args[0])
		{
			case 'multiple':
				
				if(parse(args, command, 'multiple') != true)
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
					errorMsg(command, 'multiple')
				}
				break;
			case 'yesno':
				if(parse(args, command, 'yesno') != true)
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
					errorMsg(command, 'yesno')
				}

				break;
			default:
				errorMsg(command)
				break;	
		}
		}
		catch
		{
			errorMsg(command)
		}

	}

	function errorMsg(command, type)
	{
		switch(type)
		{
			case 'multiple':
				command.channel.send("There was an error. Make sure that you have the following in the proper poll format: a poll type, a question, and at least one option [`:emoji: option`]. Make sure the emojis you are using are available to the bot. Make sure there are no duplicate options as emojis, they will not work. For more help with the command, type `!help poll`")
				break;
			case 'yesno':
				command.channel.send("There was an error. Make sure you have a poll type and a question")
				break;
			default:
				command.channel.send("There was an erorr. Make sure you have a valid poll type and the proper syntax.")
				break;
		}
	}