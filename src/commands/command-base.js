const {
  prefix
} = require('../config/config.json')

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
  console.log(`Registered command ${commands}.`)
}

module.exports.listen = (client) => {
  client.on('message', async (message) => {
    
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
          var {
              callback,
              dmsEnabled = false,
              dmsOnly = false
          } = command

          //Don't reply to a message sent by the bot
          if (author == client.user) {
              return
          }

          //Make sure it makes logical sense
          if(!dmsEnabled && dmsOnly == true)
          {
              dmsEnabled = true
          }  
          //Check [and take neccesary action] if the command is available in direct messages
          if (!message.guild && dmsEnabled == false) {
              return
          }
          //Check if the command is direct messages only
          if (message.guild && dmsOnly == true)
          {
              message.delete()
              message.reply("This command is only available in direct messages.")
              return 
          }

          callback(message, arguments, arguments.join(' '), client)

      }




  })
}