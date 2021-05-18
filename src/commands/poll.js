const Discord = require('discord.js')
module.exports = poll

// Command: !poll multiple ;; Question goes here ;; :thumbs_up: Option 1 ;; :thumbs_down: Option 2 ;; :custom_emoji: Option 3 ;;

var data = 
{
	items: [],
	msg : '', 
	emoji : '',
	eStage : 0, 
	stage : 0,  
	question : '' // The question asked by the bot
}

function resetData()
{
	data = {} // Clear data

	data = // Reset Data
	{
	items: [],
	msg : '', 
	emoji : '',
	eStage : 0, 
	stage : 0,  
	question : ''
	}

}

function parse(args, command, type) // Returns nothing if no error, returns true with an error
{
	
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
							data.items.push([data.emoji, data.msg])
							data.msg = ''
							data.eStage = 0
						}

					}
				}
				else
				{
					if (data.stage === 1)
					{
						data.question = `${data.question} ${element}`
						console.log(args)
					}
					else if (data.stage >= 2)
					{

						data.eStage = data.eStage + 1

						if (data.eStage === 1)
						{

							data.emoji = element

						}
						else if (data.eStage >= 2)
						{
							data.msg = `${data.msg} ${element}`
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
			command.channel.send('Please provide a valid poll type.')
			break;
		}
		
		if(data.stage <= 1)
		{
			command.channel.send("Incomplete command.")
			return true;
		}
	}
	catch
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
				if(!parse(args, command, 'multiple'))
				{	
					command.channel.send(data.question).then(function (sentMessage)
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
					command.channel.send(data.question).then(function (sentMessage)
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
				command.channel.send('Internal error.')
				break;	
		}

		

	}
	catch
	{

	}
	resetData()
}