// ?poll yesno question goes here
const discord = require('discord.js')
module.exports = {
    minArgs: 1,
    miniDescription: 'Start a poll.',
    description: 'Start a poll. You can choose from either a yesno poll, a simple poll with up to 20 options, or a fully custom poll with custom emojis. Starting a yesno poll is quite straightforward, just add the question after the type. As for custom and simple, you must add `|` between argument sections. An argument section is the question, an emoji deffinition, or in the simple poll case; an poll option. An emoji deffintion includes both the emoji and its deffinition. For custom polls, you can add up to 20 options and their corresponding emojis [that are accesible by the bot]. In usage, arguments wrapped in () are for use with the `custom` and `simple` types only. Arguments wrapped in {} are for use with the `custom` type only. Do not include the brackets in the actual execution of the command.',
    usage: '<type - yesno/custom/simple> (|) <message> (| {<emoji>} <description/option> [| {<emoj>} <description/option>]))',
    exampleUsage: ['yesno Is the poll command cool?', 'custom | What is your favourite programming language? | :python_emoji: Python | :javascript_emoji: Javascript | :csharp_emoji: C#', 'simple | choose a range of numbers | 0-10 | 10-20 | 20-30 | 30-40 | 40-50 | 50-60 | 60-70 | 70-80 | 80-90 | 90-100'],
    commands: 'poll',
    callback: (message, args, text, client) => {
        const type = args[0].toLowerCase()
        const question = ''
        const pollEmbed = new discord.MessageEmbed()

        .setColor('#0099ff')
        .setTitle('Poll')
        .setAuthor('devbot')

        switch(type) 
        {
            case 'yesno':
                yesno()
                message.delete()
                break;
            case 'custom':
                custom()
                message.delete()
                break;
            case 'simple':
                simple()
                message.delete()
                break;  
            default:
                message.reply("Type not recognized.")
                break;
            
        }
        function yesno()
        {
            question = text.replace(args[0], '')
                if(!question || question === '')
                {
                    return question.reply("You must provide a question for the poll.")
                }
                pollEmbed
                .setDescription(question)
                message.channel.send(pollEmbed).then(poll => {
                    poll.react('👍')
                    poll.react('👎')
                })
        }
        function custom()
        {
            const deffs = text.replace(args[0], '')
                const deffArray = deffs.split(/[|]+/)
                deffArray.shift()
                const emojis = []
                const deffinitions = []
                const question = deffArray[0]
                deffArray.shift()
                if(deffArray.length > 20)
                {
                    return message.reply(`There cannot be more than 20 options.`)
                }
                deffArray.forEach(deff => {
                    const words = deff.split(/[ ]+/)
                    words.shift()
                    
                    const emoji = words[0]
                    const  deffinition = deff.replace(emoji, '').substring(2)
                    
                    deffinitions.push([emoji, deffinition])
                    emojis.push(emoji)
                })
                
                optionsString = ''
                deffinitions.forEach(item => {
                    optionsString = `${optionsString}\n${item[0]} ${item[1]}`
                })
                pollEmbed
                .setDescription(question)
                .addField('Options', optionsString, false)
                message.channel.send(pollEmbed).then(embed => {
                    emojis.forEach(emoji => {
                        try
                        {
                            embed.react(emoji)
                        }
                        catch
                        {
                            message.reply('There was an error reacting to the message. Make sure every emoji exists and that it is accessible by the bot.')
                        }
                    })
                })
        }

        function simple()
        {
            const alpha = [
                '🇦',
                '🇧',
                '🇨',
                '🇩',
                '🇪',
                '🇫',
                '🇬',
                '🇭',
                '🇮',
                '🇯',
                '🇰',
                '🇱',
                '🇲',
                '🇳',
                '🇴',
                '🇵',
                '🇶',
                '🇷',
                '🇸',
                '🇹'
            ]
                const deffs = text.replace(args[0], '')
                const deffArray = deffs.split(/[|]+/)
                deffArray.shift()
                const emojis =[]
                const deffinitions = []
                const question = deffArray[0]
                deffArray.shift()
                if(deffArray.length > 20)
                {
                    return message.reply(`There cannot be more than 20 options.`)
                }
                for(let i=0; i<alpha.length; i++)
                {
                    const deffinition = deffArray[i]
                    const emoji = alpha[i]
                    
                    if(emoji && deffinition)
                    {
                        deffinitions.push([emoji, deffinition])
                    }
                }
                optionsString = ''
                deffinitions.forEach(item => {
                    optionsString = `${optionsString}\n${item[0]} ${item[1]}`
                })
                pollEmbed
                .setDescription(question)
                .addField('Options', optionsString, false)
                message.channel.send(pollEmbed).then(embed => {
                    deffinitions.forEach(arr => {
                        embed.react(arr[0])
                    })
                })
        }
       
    }
}

