// var globalPrefix
const mongo = require('../utils/mongo');
const commandPrefixSchema = require('../schemas/command-prefix-schema')
const guildPrefixes = {} // Guild {'guildId'}

const globalPrefix = require('../config/config.json').prefix || process.env.DEVBOT_CANARY_PREFIX
// try {
//     globalPrefix = require('../config/config.json').prefix
// } catch {
//     globalPrefix = process.env.DEVBOT_CANARY_PREFIX
// }

const validatePermissions = (permissions) => {
    const validPermissions = [
      'CREATE_INSTANT_INVITE',
      'KICK_MEMBERS',
      'BAN_MEMBERS',
      'ADMINISTRATOR',
      'MANAGE_CHANNELS',
      'MANAGE_GUILD',
      'ADD_REACTIONS',
      'VIEW_AUDIT_LOG',
      'PRIORITY_SPEAKER',
      'STREAM',
      'VIEW_CHANNEL',
      'SEND_MESSAGES',
      'SEND_TTS_MESSAGES',
      'MANAGE_MESSAGES',
      'EMBED_LINKS',
      'ATTACH_FILES',
      'READ_MESSAGE_HISTORY',
      'MENTION_EVERYONE',
      'USE_EXTERNAL_EMOJIS',
      'VIEW_GUILD_INSIGHTS',
      'CONNECT',
      'SPEAK',
      'MUTE_MEMBERS',
      'DEAFEN_MEMBERS',
      'MOVE_MEMBERS',
      'USE_VAD',
      'CHANGE_NICKNAME',
      'MANAGE_NICKNAMES',
      'MANAGE_ROLES',
      'MANAGE_WEBHOOKS',
      'MANAGE_EMOJIS',
    ]
  
    for (const permission of permissions) {
      if (!validPermissions.includes(permission)) {
        throw new Error(`Unknown permission node "${permission}"`)
      }
    }
  }

const allCommands = {}

module.exports = (options) => {
  let {
      commands,
      permissions = []
  } = options

  if (typeof commands === 'string') {
      commands = [commands]
  }


  if (permissions.length) {
    if (typeof permissions === 'string') {
      permissions = [permissions]
    }

    validatePermissions(permissions)
  }
  for (const command of commands) {
    allCommands[command] = {
        ...options,
        commands,
        permissions
    }
    }
  console.log(`Registered command ${commands}.`)
}

module.exports.listen = (client) => {
  client.on('message', async (message) => {

      var loadedPrefix
      const { member, content, guild, author } = message 
    
      if(!guild)
      {
        loadedPrefix = globalPrefix
      }
      else
      {
        loadPrefixes(client)
        loadedPrefix = guildPrefixes[guild.id] || globalPrefix
      }
      
      const prefix = loadedPrefix

      // Split on any number of spaces
      const arguments = content.split(/[ ]+/)

      // Remove the command which is the first index
      const name = arguments.shift().toLowerCase()

      if (name.startsWith(prefix)) {
          const command = allCommands[name.replace(prefix, '')]
          if (!command) {
              return
          }

          let {
              commandName, 
              description,
              expectedArgs,
              minArgs = 0,
              maxArgs = null,
              permissions = [],
              permissionError = 'You do not have permission to execute this command.',
              dmsEnabled = false,
              dmsOnly = false,
              callback,
          } = command  

          //Don't reply to a message sent by the bot
          if (author === client.user) {
              return
          }

          //Check permissions
         
          for (const permission of permissions) {
            if (!member.hasPermission(permission)) {
              message.reply(permissionError)
              return
            }
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

module.exports.loadPrefixes = loadPrefixes

async function loadPrefixes(client){
    await mongo().then(async mongoose => {
        try {
            for (const guild of client.guilds.cache)
            {
                const guildId = guild[1].id

                const result = await commandPrefixSchema.findOne({_id: guildId})

                if (result){

                    guildPrefixes[guildId] = result.prefix
    
                } else {
    
                    guildPrefixes[guildId] = globalPrefix
    
                }

            }
        } finally {
            mongoose.connection.close()
        }
    })
}
