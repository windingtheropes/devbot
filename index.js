// Dependencies
const { Client, Collection, Intents } = require('discord.js');
const dotenv = require('dotenv');
const { version, prerelease } = require('./versioninfo.json')
const fs = require('fs');
const path = require('path');
const dbInit = require("./config/db.init.dev")

// Dotenv
dotenv.config()

// Listeners
const commandBase = require('./commands/command-handler.js')
const listenerBase = require('./listeners/listener-base.js')

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
  console.log(`devbot version ${version}\nCreated by windingtheropes${prerelease ? '\nPre-release version; expect bugs and instabilities.\n' : '\n'}`)
  // Initialize connection to the sql database
  try {
    dbInit()
  }
  catch {
    return console.log(`[ERROR] error connecting to sql.`)
  }

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

