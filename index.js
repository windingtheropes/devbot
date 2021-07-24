const path = require('path')
const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()

const {version} = require('./version.json')
const mongo = require('./utils/mongo')
console = require('./utils/consoleBatchLog')

//command base

const commandBaseFile = 'command-base.js'
const commandBase = require(`./commands/${commandBaseFile}`)

//listener base

const listenerBaseFile = 'listener-base.js'
const listenerBase = require(`./features/message/${listenerBaseFile}`)

client.startTime = +new Date

client.on('ready', async () => {
  
  console.batchLog([`devbot client is ready`, `Version ${version}`, `Created by windingtheropes\n`])

  client.user.setPresence({
    status: 'online',
    activity: {
      type: 'PLAYING',
      name: `!help — created by windingtheropes`,
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

  listenersImport()

  //start the command message listener

  commandBase.listen(client)

  //start the secondary message listener

  listenerBase.listen(client)

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


function listenersImport()
{
  //dynamically import commands
  const readListeners = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir))
    for (const file of files) {
        const stat = fs.lstatSync(path.join(__dirname, dir, file))

        if (stat.isDirectory()) {
            readListeners(path.join(dir, file))
        } else if (file !== listenerBaseFile) {
            const callback = require(path.join(__dirname, dir, file))
            listenerBase(callback)
        }
    }
}

  readListeners('features/message')
}

try
{
  client.login(require('./config/config.json').token)
}
catch
{
  client.login(process.env.DEVBOT_TOKEN)
}