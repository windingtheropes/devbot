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
const getRandom = require('./commands/get_random');
const poll = require('./commands/poll');


var prefix = config.prefix;
let msg
let botCache = {}
let startedAt = Date.now()

try{
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
                channel(args, command)
                break;
            case 'poll':
                poll(args, command)
                break;

            //Simple response commands

            case 'devbotsucksandshouldgoaway':
                command.channel.send('*D=*')
                break;
            case 'funne?':
                if(getRandom(1,1000) == getRandom(1,1000))
                {
                    command.channel.send("maybe.")
                }
                else if(getRandom(1,1000000) == getRandom(1,1000000))
                {
                    command.channel.send("yes.")
                }
                else
                {
                    command.channel.send("no.")
                }
                break;
            case 'ping':
                command.channel.send(`:ping_pong: Pong! Latency: ${Date.now() - command.createdTimestamp}ms.`)
                break;

            //Testing commands
           
        }
        
    }

    
    

    
    client.login(config.token)
    
}
catch
{
    console.log("There was an error.")
}