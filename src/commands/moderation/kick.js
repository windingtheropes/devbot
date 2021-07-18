const sendDm = require('../../utils/sendDm')
module.exports = {
    commands: 'kick',
    callback: (message, args, text, client) => {
        const { member, mentions, guild } = message
        if(member.hasPermission('ADMINISTRATOR') || member.hasPermission('KICK_MEMBERS'))
        {   
            const botInServer = message.guild.members.cache.get(client.user.id)
            if(!botInServer.hasPermission('ADMINISTRATOR') || !botInServer.hasPermission('KICK_MEMBERS'))
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
            if(target)
            {
                var reason
                
                if(args[1])
                {
                    text = text.replace(args[0], '').substring(1)
                    if(text)
                    {
                        if(text.length > 512)
                        {
                            return message.reply("Reason must be 512 character or shorter.")
                        }
                        reason = text
                    }
                }
                   
                const targetMember = message.guild.members.cache.get(targetId)

                if(targetMember.hasPermission('ADMINISTRATOR') || targetMember.hasPermission('KICK_MEMBERS'))
                {
                     return message.reply("You cannot ban a user who has kick permissions or admin.")
                }
                
                targetMember.kick(reason)
                return message.reply(`Kicked ${userToKickMention} for ${(reason || 'no reason')}.`)
            }
            else
            {
                return message.reply("Please specify the user to kick.")
 
            }
        }
        else
        {
            return message.reply("Insufficient permissions.")
        }
    }
}