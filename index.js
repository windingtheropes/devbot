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