const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const dotenv = require('dotenv');
const fs = require('fs')
const path = require('path')

dotenv.config()

const commands = []

function loadCommands() {
  const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir));

    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file))

      if (stat.isDirectory()) {
        readCommands(path.join(dir, file))
      } else if (file !== 'command-handler.js' && file.endsWith('.js')) {
        const command = require(path.join(__dirname, dir, file))
        if(command.enabled == false) continue
        commands.push(command.data.toJSON());

      }
    }
  }
  readCommands('commands')
}
loadCommands()

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

rest.put(Routes.applicationCommands(process.env.clientId), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);

rest.put(Routes.applicationCommands(process.env.clientId), { body: commands })
  .then(() => console.log('Successfully registered application slash commands.'))
  .catch(console.error);
