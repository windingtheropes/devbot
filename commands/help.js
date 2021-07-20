const Discord = require('discord.js')
const {operators} = require('../config.json')
module.exports = help

function help(args, command)
{
    const helloHelp = 'Say hello! Usage `!hello`';
        const jokeHelp =  'Laugh very loud because the jokes are very funny. Usage `!joke`';
        const randomHelp = 'Generates a random number between two numbers. Usage `!random 1 10`';
        const calcHelp = 'Calculate command. Usage `!calc [operation] [numbers]`' + ' \n __**Operations:**__ \n`multiply`, `divide`, `add`, `subtract`';
        const helpHelp = 'Get this help message. `!help`';
        const channelHelp = 'Channel command. Currently, the only supported method is `create`. The name cannot have spaces. Usage `!channel [method] [type] [name]` \n__**Methods**__\n`create`\n__**Types**__\n`text` ,`voice`';
        const statsHelp = 'Stats command. Get various Discord statistics. Accepts one argument: selector, to get a specific statistic rather than the whole list. You can also append a Discord ID as the selector to get the date. Usage `!stats [selector]` \n__**Selectors**__\n`uptime` Get bot uptime\n`startdate` Get bot start date\n`messageid` Get the ID of the message you sent to trigger the command\n`messagedate` Get the message creation date\n`accountid/userid/myid` Get your Discord ID\n`accountdate/userdate` Get your Discord account creation date\n`serverid` Get the ID of the server you sent the command from\n`serverdate` Get the server creation date\n`channelid` Get the ID of the channel you sent the command from\n`channeldate` Get the channel creation date\n``latency/ping` Get the bot latency (ping)';
        const pollHelp = 'Poll command. Start a poll. Usage `!poll [type] [message] [deffinitions]` \n__**Types**__\n`yesno` Start a simple yes or no poll, only accepts message argument.\n`multiple` Start a more advanced poll, with unlimited options. Accepts message, and emoji deffinitions for each option, each separated with `;;`.\n__**Examples**__\n__yes/no poll__\n`!poll yesno Do you like trains?`\n__multiple options poll__\n`!poll multiple ;; Which emoji is better? ;; :smile: smile ;; :cry: cry ;; :rofl: rofl ;;`';
        const setstatusHelp = "Bot operator only, setstatus command. Set the bot's status. Usage `!setstatus [type] [status] [message]`.\n**__Options__**\n[type]: watching, listening [to], playing, clear [clear devbot's status]\nThe following options do not apply to the `clear` type.\n[status] online, idle, dnd\n[message] The message for the status, surrounded in quotations.\n"+'**__Example__**\n`!setstatus playing idle "new devbot command: !setstatus!"`'
        if (args.length == 0)
        {
            const genericHelp = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Generic help')
                .setAuthor('devbot')
                .setDescription('devbot commands are fairly simple, the root command is not case sensitive, but the arguments that follow are sensitive to case. \n Below is a list of devbot commands. For help with a specific command, type `!help [command]`')
                .addField('!hello', "Say hello!" , false)
                .addField('!joke', "Funny jokes." , false)
                .addField('!random', "Random number generator.", false)
                .addField('!calc', "Calculate the numbers." , false)
                .addField('!help',"Help command." , false)
                .addField('!channel',"Discord channel command." , false)
                .addField('!stats',"Bot, server, message and user stats." , false)
                .addField('!poll',"Start a poll." , false)
                
    
    
            command.channel.send(genericHelp);
        }
        else if (args.length > 0) 
        {
            switch (args[0]) {
                case "hello":
                    const helloHelpEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Specific Command Help')
                    .setAuthor('devbot')
                    .setDescription(helloHelp)
        
                    command.channel.send(helloHelpEmbed);
                    break;
             case "joke":
                    const jokeHelpEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Specific Command Help')
                    .setAuthor('devbot')
                    .setDescription(jokeHelp)
        
                    command.channel.send(jokeHelpEmbed);
                    break;
            case "random":
                    const randomHelpEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Specific Command Help')
                    .setAuthor('devbot')
                    .setDescription(randomHelp)
        
                    command.channel.send(randomHelpEmbed);
                    break;
            case "calc":
                    const calcHelpEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Specific Command Help')
                    .setAuthor('devbot')
                    .setDescription(calcHelp)
        
                    command.channel.send(calcHelpEmbed);
                    break;   
            case "help":
                    const helpHelpEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Specific Command Help')
                    .setAuthor('devbot')
                    .setDescription(helpHelp)
        
                    command.channel.send(helpHelpEmbed);
                    break;    
            case "channel":
                    const channelHelpEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Specific Command Help')
                    .setAuthor('devbot')
                    .setDescription(channelHelp)
        
                    command.channel.send(channelHelpEmbed);
                    break;  
            case "stats":
                    const statsHelpEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Specific Command Help')
                    .setAuthor('devbot')
                    .setDescription(statsHelp)
        
                    command.channel.send(statsHelpEmbed);
                    break;  
            case "poll":
                    const pollHelpEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Specific Command Help')
                    .setAuthor('devbot')
                    .setDescription(pollHelp)
        
                    command.channel.send(pollHelpEmbed);
                    break;            
            case "setstatus":
                if(operators.indexOf(command.author.id) > -1)
                {
                        const setstatusHelpEmbed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('Specific Command Help - Operator only')
                        .setAuthor('devbot')
                        .setDescription(setstatusHelp)
                        command.author.send(setstatusHelpEmbed).catch(error => {
                            command.channel.send(`<@${command.author.id}> Your DMs are closed. Here's how to turn them on: https://support.discord.com/hc/en-us/articles/217916488-Blocking-Privacy-Settings`)
                        })
                }
                else
                {
                    command.channel.send("Insufficient permissions")
                }
                    break;
                default:
                    command.channel.send("Could not find help for a command called `" + args[0] + "`")
                    break;
            }
        } 
        else {
            command.channel.send("There was a problem.")
        }
}