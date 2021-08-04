const path = require('path')
const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()

const mongo = require('./utils/mongo')


//command base

const commandBaseFile = 'command-base.js'
const commandBase = require(`./commands/${commandBaseFile}`)

//listener base

const messageListenerBaseFile = 'messageListener-base.js'
const messageListenerBase = require(`./features/message/${messageListenerBaseFile}`)

//user join base

const userJoinListenerBaseFile = 'userJoinListener-base.js'
const userJoinListenerBase = require(`./features/userJoin/${userJoinListenerBaseFile}`)

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

  await mongo().then(mongoose => {
    try {
       console.log("Connected to mongo.")
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

    //listeners

  userJoinListenersImport()

  //start the command message listener

  commandBase.listen(client)

  //start the secondary message listener

  messageListenerBase.listen(client)

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

try
{
  client.login(require('./config/config.json').token)
}
catch
{
  client.login(process.env.DEVBOT_TOKEN)
}