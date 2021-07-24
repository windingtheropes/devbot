module.exports = {
    commands: ['gitrepo', 'repo', 'devbotrepo'],
    callback: (message) => {
        message.reply('The devbot source code is hosted at https://github.com/alacriware/devbot.')
    }
}