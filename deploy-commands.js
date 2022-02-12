const { SlashCommandBuilder } = require('@discordjs/builders')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const dotenv = require('dotenv');
const fs = require('fs')
const path = require('path')

dotenv.config()

const commands = []
// const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// for (const file of commandFiles) {
// 	const command = require(`./commands/${file}`);
// 	commands.push(command.data.toJSON());
// }


  
    const readCommands = (dir) => {
      const files = fs.readdirSync(path.join(__dirname, dir));
  
      for (const file of files) {
        const stat = fs.lstatSync(path.join(__dirname, dir, file))
  
        if (stat.isDirectory()) {
          readCommands(path.join(dir, file))
        } else if (file !== 'command-handler.js' && file.endsWith('.js')) {
          const command = require(path.join(__dirname, dir, file))
          commands.push(command.data.toJSON());
        }
      }
    }
  
    readCommands('commands')

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.clientId, process.env.guildId), { body: commands })
    .then(() => console.log('Successfully registered application slash commands.'))
    .catch(console.error);
