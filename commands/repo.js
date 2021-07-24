module.exports = {
    commands: ['gitrepo', 'repo'],
    callback: (message) => {
        message.reply('devbot source code is hosted at https://github.com/alacriware/devbot.')
    }
}