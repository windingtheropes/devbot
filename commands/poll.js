// ?poll yesno question goes here
const discord = require('discord.js')
module.exports = {
    minArgs: 1,
    miniDescription: 'Start a poll.',
    description: 'Start a poll. You can choose from either a simple yesno poll, or a fully customizable multiple poll. Starting a yesno poll is quite straightforward, just add the question after the type. As for the multiple type, you must add `|` between argument sections. An argument section is the question, or an emoji deffinition. An emoiji deffintion includes both the emoji and its deffinition. You can add as many emoji deffinitions as there are emojis accessible by the bot. In usage, arguments wrapped in () are for use with the `multiple` type only. Do not include the brackets in the actual execution of the command.',
    usage: '<type - yesno/multiple> (|) <message> (| <emoji> <description> [| <emoj> <description>]))',
    commands: 'poll',
    callback: (message, args, text, client) => {
        const type = args[0].toLowerCase()
        let question
        const pollEmbed = new discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Poll')
        .setAuthor('devbot')
        switch(type) 
        {
            case 'yesno':
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
                break;
            case 'multiple':
                const deffs = text.replace(args[0], '')
                const deffArray = deffs.split(/[|]+/)
                deffArray.shift()
                const emojis = []
                const deffinitions = []
                question = deffArray[0]
                deffArray.shift()
                deffArray.forEach(deff => {
                    const words = deff.split(/[ ]+/)
                    words.shift()
                    
                    const emoji = words[0]
                    const deffinition = deff.replace(emoji, '').substring(2)
                    
                    deffinitions.push([emoji, deffinition])
                    emojis.push(emoji)
                })
                
                let optionsString = ''
                deffinitions.forEach(item => {
                    optionsString = `${optionsString}\n${item[0]} ${item[1]}`
                })
                pollEmbed
                .setDescription(question)
                .addField('Options', optionsString, false)
                message.channel.send(pollEmbed).then(embed => {
                    emojis.forEach(emoji => {
                        embed.react(emoji)
                    })
                })
                break;
            default:
                break;
        }
    }
}