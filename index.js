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