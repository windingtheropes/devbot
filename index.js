const Discord = require('discord.js');
const client = new Discord.Client()
const config = require('./config.json')

const help = require('./commands/help')
const stats = require('./commands/stats');
const hello = require('./commands/hello');
const calc = require('./commands/calc');
const random = require('./commands/random');
const joke = require('./commands/joke');
const channel = require('./commands/channel');

var prefix = config.prefix;
let msg
let botCache = {}
let startedAt = Date.now()
const cmds = {
    
}

    client.on('ready', () => {
        console.log('Client ready.');
        client.guilds.cache.forEach(guild => {
            botCache[guild.id] = {}
          })
        
    })
    
    client.on('message', (message) => {
        if (message.author == client.user) { 
            return
        }
        if (message.content.startsWith(prefix)) {
            commandHandler(message)
        }
    })
   
    function commandHandler(command)
    {
        let rootCommand = command.content.substr(1).split(" ")[0].toLowerCase();
        let args = command.content.substr(1).split(" ").slice(1); 
        console.log(`root command: '${rootCommand}' full command: '${command}' args: '${args}'`)
        switch(rootCommand)
        {
            //Modular Commands
        
            case 'help':
                help(args, command)
                break;
            case 'stats':
                stats(args, command, startedAt)
                break;
            case 'hello':
                hello(command)
                break;
            case 'calc':
                calc(args, command)
                break;
            case 'random':
                random(args, command)
                break;
            case 'joke':
                joke(command)
                break;
            case 'channel':
                channel(args, channel)
                break;

            //Simple response commands

            case 'devbotsucksandshouldgoaway':
                command.channel.send('*D=*')
                break;
            case 'funne?':
                command.channel.send('no.')
                break;
        }
        
    }

    
    

    
    client.login(config.token)
    
    
