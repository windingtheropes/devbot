const Discord = require('discord.js')
module.exports = poll

// Command: !poll multiple ;; Question goes here ;; :thumbs_up: Option 1 ;; :thumbs_down: Option 2 ;; :custom_emoji: Option 3 ;;

var stage = 0 // 1 = Question
// 2+ = Emojis and Deffinitions
var emojiStage = 0 // 1 = Emoji
	 // 2+ = Deffinition 
var items = []
var message = ''

var tempMsg = ''
var tempEmoji = ''

function poll(args, command)
{
	try
	{

		switch (args[0])
		{
		case 'multiple':
			args.splice(0, 1)

			args.forEach(element =>
			{
				if (element === ';;')
				{
					stage = stage + 1

					if (stage >= 2)
					{
						if (emojiStage >= 2)
						{
							items.push([tempEmoji, tempMsg])
							tempMsg = ''
							emojiStage = 0
						}

					}
				}
				else
				{
					if (stage === 1)
					{
						message = `${message} ${element}`
						console.log(args)
					}
					else if (stage >= 2)
					{

						emojiStage = emojiStage + 1

						if (emojiStage === 1)
						{

							tempEmoji = element

						}
						else if (emojiStage >= 2)
						{
							tempMsg = `${tempMsg} ${element}`
						}

					}

				}
			});

			items.forEach(element =>
			{
				message = `${message} \n${element[0]}: ${element[1]}`
			})
			command.channel.send(message).then(function (sentMessage)
			{
				items.forEach(element =>
				{
					sentMessage.react(element[0])
				})
				command.delete()
			});
			break;

		case 'yesno':
			args.splice(0, 1)
			args.forEach(element =>
			{
				message = `${message} ${element}`
			})
			command.channel.send(message).then(function (sentMessage)
			{
				sentMessage.react('👍')
				sentMessage.react('👎')
				command.delete()
			});
			break;
		default:
			command.channel.send('Please provide a valid poll type.')
			break;
		}
	}
	catch
	{

	}

}