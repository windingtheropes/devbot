const kick = require('../../utils/kick')
const stringToBool = require('../../utils/stringToBool')
module.exports = {
    enabled: false,
    commands: 'kick',
    permissions: ['KICK_MEMBERS'],
    miniDescription: 'Kick a server member.',
    description: 'Kick a member of the server. Requires the user executing the command to have the kick members permission. Cannot kick another user with the kick members permission.',
    usage: '<usermention> [senddm - true/false] [reason]',
    minArgs: 2,
    callback: (message, args, text, client) => {
        const { member, mentions, guild } = message
         
            const botInServer = message.guild.members.cache.get(client.user.id)
            if(!botInServer.permissions.has('ADMINISTRATOR') || !botInServer.permissions.has('KICK_MEMBERS'))
            { 
                return message.reply("I do not have permission to kick members.")
            }
            const target = args[0]
            const userToKickMention = args[0]
            var targetId
            if(target.startsWith('<@!') && target.endsWith('>'))
            { 
                targetId = target.substring(3).slice(0, -1)
            }
            else
            { 
                return
            }
            if(target)
            {
                var reason
                
                var sendMessage = false
                if(args[1])
                {
                    sendMessage = stringToBool(args[1])
                    if(!(sendMessage == true || sendMessage == false))
                    {
                        return message.reply("Send message must be a boolean (true or false).")
                    }
                }

                if(args[2])
                {
                    text = text.replace(args[0], '').replace(args[1], '').substring(2)
                    if(text)
                    {
                        if(text.length >= 512)
                        {
                            return message.reply("Reason must be 512 character or shorter.")
                        }
                        reason = text
                    }
                }
                   
                const targetMember = message.guild.members.cache.get(targetId)
                if(!targetMember)
                {
                    return message.reply("Member not found.")
                }

                if(targetMember.permissions.has('ADMINISTRATOR') || targetMember.permissions.has('KICK_MEMBERS'))
                {
                     return message.reply("You cannot ban a user who has kick permissions or admin.")
                }
                try
                { 
                    kick(message.channel.guild, targetMember, sendMessage, reason)
                }
                 catch{
                     return message.reply("There was an erorr.")
                 }
               
                return message.reply(`Kicked ${userToKickMention} for ${(reason || 'no reason')}.`)
            }
            else
            {
                return message.reply("Please specify the user to kick.")
 
            }
    }
}