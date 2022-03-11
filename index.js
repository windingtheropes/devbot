<<<<<<< HEAD
const path = require('path')
const fs = require('fs')
const Discord = require('discord.js')

const client = new Discord.Client({ allowedMentions: {repliedUser: false}, intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES", "GUILD_BANS"] })
const microchatsSchema = require('./schemas/microchats-schema.js')
const mongo = require('./utils/mongo')

client.setMaxListeners(0);
//command base

const commandBaseFile = 'command-base.js'
const commandBase = require(`./commands/${commandBaseFile}`)

//listener base

const messageListenerBaseFile = 'messageListener-base.js'
const messageListenerBase = require(`./features/message/${messageListenerBaseFile}`)

//listener base

const pinListenerBaseFile = 'channelPinsUpdate-listener-base.js'
const pinListenerBase = require(`./features/pinsUpdate/${pinListenerBaseFile}`)

//user join base

const userJoinListenerBaseFile = 'userJoinListener-base.js'
const userJoinListenerBase = require(`./features/userJoin/${userJoinListenerBaseFile}`)

const vcStateChangeListenerBaseFile = 'vcStateChangeListener-base.js'
const vcStateChangeListenerBase = require(`./features/vcStateChanged/${vcStateChangeListenerBaseFile}`)

client.startTime = +new Date

client.on('ready', async () => {
  
  console.log(`devbot client is ready`, `\nCreated by windingtheropes\n`)

  client.user.setPresence({
    status: 'online',
    activity: {
      type: 'PLAYING',
      name: `!help — github.com/alacriware/devbot`,
    }
  })


  await mongo().then(async mongoose => {
    try {
       await console.log("Connected to mongo.")
       
     } 
     catch
     {
       console.log("Error connecting to mongo.")
     }
     finally {
       mongoose.connection.close()
     }
   })

   commandBase.loadPrefixes(client)

  //dynamic imports

  //commands

  commandsImport()

  //listeners

  messageListenersImport()

  userJoinListenersImport()

  vcStateChangeListenersImport()

  pinsListenerImport()

  //start the command message listener

  commandBase.listen(client)

  //start the secondary message listener

  messageListenerBase.listen(client)

  //start the user join listener

  userJoinListenerBase.listen(client)

  vcStateChangeListenerBase.listen(client)

  pinListenerBase.listen(client)




})

function commandsImport()
{
  //dynamically import commands

  const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir))

    for (const file of files) {
        const stat = fs.lstatSync(path.join(__dirname, dir, file))

        if (stat.isDirectory()) {
            readCommands(path.join(dir, file))
        } else if (file !== commandBaseFile) {
            const option = require(path.join(__dirname, dir, file))
            commandBase(option)
        }
    }
}

  readCommands('commands')
}

function pinsListenerImport()
{
  //dynamically import commands

  const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir))

    for (const file of files) {
        const stat = fs.lstatSync(path.join(__dirname, dir, file))

        if (stat.isDirectory()) {
            readCommands(path.join(dir, file))
        } else if (file !== pinListenerBaseFile) {
            const option = require(path.join(__dirname, dir, file))
            pinListenerBase(option)
        }
    }
}

  readCommands('features/pinsUpdate')
}


function messageListenersImport()
{
  //dynamically import commands
  const readListeners = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir))
    for (const file of files) {
        const stat = fs.lstatSync(path.join(__dirname, dir, file))

        if (stat.isDirectory()) {
            readListeners(path.join(dir, file))
        } else if (file !== messageListenerBaseFile) {
            const callback = require(path.join(__dirname, dir, file))
            messageListenerBase(callback)
        }
    }
}

  readListeners('features/message')
}



function userJoinListenersImport()
{
  const readListeners = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir))
    for (const file of files) {
        const stat = fs.lstatSync(path.join(__dirname, dir, file))

        if (stat.isDirectory()) {
            readListeners(path.join(dir, file))
        } else if (file !== userJoinListenerBaseFile) {
            const callback = require(path.join(__dirname, dir, file))
            userJoinListenerBase(callback)
        }
    }
}
  readListeners('features/userJoin')
}


function vcStateChangeListenersImport()
{
  const readListeners = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir))
    for (const file of files) {
        const stat = fs.lstatSync(path.join(__dirname, dir, file))

        if (stat.isDirectory()) {
            readListeners(path.join(dir, file))
        } else if (file !== vcStateChangeListenerBaseFile) {
            const callback = require(path.join(__dirname, dir, file))
            vcStateChangeListenerBase(callback)
        }
    }
}
  readListeners('features/vcStateChanged')
}


try
{
  client.login(require('./config/config.json').token)
}
catch
{
  client.login(process.env.TOKEN)
}
=======
// deps
const { Client, Collection, Intents } = require('discord.js');
const dotenv = require('dotenv');
const { version, prerelease } = require('./versioninfo.json')
const fs = require('fs');
const mongo = require('./utils/mongo')
const path = require('path');

// configs
dotenv.config()

// vars
const commandBase = require('./commands/command-handler.js')

const listenerBase = require('./listeners/listener-base.js')
// const messageListenerBaseFile = 'messageListener-base.js'
// const messageListenerBase = require(`./features/message/${messageListenerBaseFile}`)

// const pinListenerBaseFile = 'channelPinsUpdate-listener-base.js'
// const pinListenerBase = require(`./features/pinsUpdate/${pinListenerBaseFile}`)

// const userJoinListenerBaseFile = 'userJoinListener-base.js'
// const userJoinListenerBase = require(`./features/userJoin/${userJoinListenerBaseFile}`)

// const vcStateChangeListenerBaseFile = 'vcStateChangeListener-base.js'
// const vcStateChangeListenerBase = require(`./features/vcStateChanged/${vcStateChangeListenerBaseFile}`)


const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS
  ]
})

client.on('ready', async () => {
  console.log(`devbot is at ${(client.guilds.cache.size / 75) * 100}% (${client.guilds.cache.size}/75) of servers to reach verification eligibility.`)

  console.log(`devbot version ${version}\nCreated by windingtheropes${prerelease ? '\nPre-release version; expect bugs and instabilities.\n' : '\n'}`)
  
  await mongo().then(async mongoose => {
    try {
      console.log("Connected to mongo.\n")
    }
    catch
    {
      return console.log("Error connecting to mongo.")
    }
  })

  // start command listener
  commandsImport()
  commandBase.listen(client)

  // import other listeners
  listenerBase.import()
  listenerBase.listen(client)

})

function commandsImport() {
  client.commands = new Collection();

  const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir));

    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file))

      if (stat.isDirectory()) {
        readCommands(path.join(dir, file))
      } else if (file !== 'command-handler.js' && file.endsWith('.js')) {
        const command = require(path.join(__dirname, dir, file))
        client.commands.set(command.data.name, command);
      }
    }
  }

  readCommands('commands')
}

client.login(process.env.TOKEN)
>>>>>>> 68de58c31fbcabb21f64c9c1efa8a9816df87a3a
