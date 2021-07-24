var operators
try {
    operators = require('../../config/config.json').operators
} catch {
    operators = process.env.DEVBOT_OPERATORS.split(',')
}
module.exports = {
    operatorOnly: true,
    listed: false,
    dmsOnly: true,
    commands: 'setstatus',
    miniDescription: "Set the bot's status. For operators only.",
    description: "Used to set the bot's status and presence. For bot operators only. Use clear as the first argument to clear the bot's status.",
    usage: '[visibility - online/idle/dnd | clear] [activity - playing/listening/watching/streaming] [status]',
    callback: (message, args, text, client) => {
        
        if(!args[0])
        {
            return message.reply("This command requires options. Example: `!setstatus online playing new command`, `!setstatus online`, `!setstatus clear`.")
        }
        // !setstatus online playing status
        var visibility = 'online'
        var activity
        var status
        
        visibility = args[0].toLowerCase()
        if (!['online', 'dnd', 'idle'].includes(visibility)) {
            if(!visibility == 'clear')
            {
                return message.reply("You must provide a valid visibility (online, idle, dnd)")
            }
            return client.user.setPresence({
                status: 'online',
                activity: null
            })
        }
        if (!args[1] && !args[2]) {
            return client.user.setPresence({
                status: visibility
            })
        }
        activity = args[1].toLowerCase()
        if (!['playing', 'watching', 'streaming', 'listening'].includes(activity)) {
            return message.reply("You must provide a valid activity (playing, watching, streaming, listening)")
        }
        var status = text.replace(args[0], '').replace(args[1], '').substring(1)
        if (!status || status == '') {
            return message.reply("The status can't be empty.")
        }
        return client.user.setPresence({
            status: visibility,
            activity: {
                name: status,
                type: activity.toUpperCase()
            }
        })
    }
}