const {
  prefix
} = require('../config.json')

const allCommands = {}

module.exports = (options) => {
  let {
      commands = []
  } = options

  if (typeof commands === 'string') {
      commands = [commands]
  }

  for (const command of commands) {
      allCommands[command] = {
          ...options,
          commands
      }
  }
}

module.exports.listen = (client) => {
  client.on('message', (message) => {
    
      const { member, content, guild, author } = message 

      // Split on any number of spaces
      const arguments = content.split(/[ ]+/)

      // Remove the command which is the first index
      const name = arguments.shift().toLowerCase()

      if (name.startsWith(prefix)) {
          const command = allCommands[name.replace(prefix, '')]
          if (!command) {
              return
          }
          const {
              callback,
              dmsEnabled = false
          } = command

          //Don't reply to a message sent by the bot
          if (author == client.user) {
              return
          }

          //Check [and take neccesary action] if the command is available in direct messages
          if (message.channel.type === 'dm' && dmsEnabled == false) {
              return
          }

          callback(message, arguments, arguments.join(' '), client)

      }




  })
}