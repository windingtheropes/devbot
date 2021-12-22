const ban = require('../../utils/ban')
const stringToBool = require('../../utils/stringToBool')
module.exports = {
    permissions: ['BAN_MEMBERS'],
    miniDescription: 'Ban a server member',
    description: 'Ban a member of the server. Requires the user executing the command to have the ban members permission. Cannot ban another user with the ban members permission.',
    usage: '<usermention> [senddm - true/false] [delete x days of messages - 0/1/7] [reason]',
    commands: 'ban',
    minArgs: 4,
    callback: (message, args, text, client) => {
        const { member, mentions } = message
        const botInServer = message.guild.members.cache.get(client.user.id)
        if (!botInServer.permissions.has('ADMINISTRATOR') || !botInServer.permissions.has('BAN_MEMBERS')) {
            return message.reply("I do not have permission to ban members.")
        }
        const target = args[0]
        const userToBanMention = args[0]
        var targetId
        if (target.startsWith('<@!') && target.endsWith('>')) {
            targetId = target.substring(3).slice(0, -1)
        }
        if (target) {
            var sendMessage = false
            if (args[1]) {
                sendMessage = stringToBool(args[1])
                if (!(sendMessage == true || sendMessage == false)) {
                    return message.reply("Send message must be a boolean (true or false).")
                }
            }

            var reason
            var days
            if (args[2]) {
                switch (args[2]) {
                    case '0':
                        
                        break;
                    case '1':
                        days = 1
                        break;
                    case '7':
                        days = 7
                        break;
                    default:
                        
                        break;
                }
                text = text.replace(args[0], '').replace(args[1], '').replace(args[2], '').substring(2)
                if (text) {
                    if (text.length >= 512) {
                        return message.reply("Reason must be 512 characters or shorter.")
                    }
                    reason = text
                }
            }

            const targetMember = message.guild.members.cache.get(targetId)
            if(!targetMember)
            {
                return message.reply("Member not found.")
            }
            if (targetMember.permissions.has('ADMINISTRATOR') || targetMember.permissions.has('BAN_MEMBERS')) {
                return message.reply("You cannot ban a user who has ban permissions or admin.")
            }

           try
           { 
               ban(message.channel.guild, targetMember, sendMessage, { reason: reason, days: days })
            }
            catch{
                return message.reply("There was an erorr.")
            }

            return message.reply(`Banned ${userToBanMention} for ${(reason || 'no reason')} and deleted ${(days || 0)} days' worth of messages from this user.`)
        }
        else {
            return message.reply("Please specify the user to ban.")

        }
    }
}