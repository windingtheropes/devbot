var globalPrefix
const mongo = require('../utils/mongo');
const commandPrefixSchema = require('../schemas/command-prefix-schema')
const guildPrefixes = {} // Guild {'guildId'}

try {
    globalPrefix = require('../config/config.json').prefix
} catch {
    globalPrefix = process.env.DEVBOT_CANARY_PREFIX
}

const validPermissions = [
"CREATE_INSTANT_INVITE",
"KICK_MEMBERS",
"BAN_MEMBERS",
"ADMINISTRATOR"	,
"MANAGE_CHANNELS",
"MANAGE_GUILD",
"ADD_REACTIONS",
"VIEW_AUDIT_LOG",	
"PRIORITY_SPEAKER",
"STREAM",
"VIEW_CHANNEL",
"SEND_MESSAGES",
"SEND_TTS_MESSAGES",
"MANAGE_MESSAGES",
"EMBED_LINKS",
"ATTACH_FILES",
"READ_MESSAGE_HISTORY",
"MENTION_EVERYONE",
"USE_EXTERNAL_EMOJIS",
"VIEW_GUILD_INSIGHTS",	
"CONNECT" ,
"SPEAK",
"MUTE_MEMBERS",
"DEAFEN_MEMBERS",
"MOVE_MEMBERS",
"USE_VAD",
"CHANGE_NICKNAME",
"MANAGE_NICKNAMES",
"MANAGE_ROLES",
"MANAGE_WEBHOOKS",
"MANAGE_EMOJIS",
"USE_SLASH_COMMANDS",
"REQUEST_TO_SPEAK",
"MANAGE_THREADS",
"USE_PUBLIC_THREADS",
"USE_PRIVATE_THREADS"
]

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


      loadPrefixes(client)
      const { member, content, guild, author } = message 

     const prefix = guildPrefixes[guild.id] || globalPrefix

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
              dmsOnly = false,
              requiredPermissions
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
