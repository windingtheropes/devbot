const version = require('../version.json')
module.exports = {
    commands: ['version'],
    callback: (message, args, text, client) => {
        message.reply(`Devbot version ${version.current}, ${new Date().getFullYear()} windingtheropes`)
    }
}