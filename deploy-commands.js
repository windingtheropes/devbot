const { REST } = require('discord.js')
const { Routes } = require('discord-api-types/v9')
const dotenv = require('dotenv');
const fs = require('fs')
const path = require('path')

dotenv.config()
function equalsOneOf(value, refArray) {
  for (const r of refArray) {
    if(value == r) return true
  }
  return false
}
function deployInteractions(opt) {
  const flush = (() => {
    if(!opt) return false
    else return opt.toLowerCase() == "flush"
  })()
  if(flush) console.log("Flushing all application commands.")
  
  const commands = []

  function loadCommands() {
    const readCommands = (dir) => {
      const files = fs.readdirSync(path.join(__dirname, dir));
  
      for (const file of files) {
        const stat = fs.lstatSync(path.join(__dirname, dir, file))
        
        const fileparts = (() => {
          let p = file.split('.')
          p.pop()
          return p
        })()

        if(!equalsOneOf(fileparts.pop(), ['ctx', 'command'])) continue
        
        if (stat.isDirectory()) {
          readCommands(path.join(dir, file))
        } else if (file !== 'interaction-handler.js' && file.endsWith('.js')) {
          const command = require(path.join(__dirname, dir, file))
          if(command.enabled == false) continue
          commands.push(command.data.toJSON());
  
        }
      }
    }
    readCommands('interactions')
  }
  loadCommands()
  
  const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
  
  if(flush) {
    rest.put(Routes.applicationCommands(process.env.clientId), { body: [] })
    .then(() => console.log('Successfully deleted all application commands.'))
    .catch(console.error);
  }
  
  rest.put(Routes.applicationCommands(process.env.clientId), { body: commands })
    .then(() => console.log(`Successfully registered application commands.`))
    .catch(console.error);
}

deployInteractions(process.argv[2])