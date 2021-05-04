const Discord = require('discord.js')
module.exports = stats

function stats(args, command, startTime)
{
    var embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Stats')
                .setAuthor('devbot')
                
    var statistics = {
        "uptime": Math.abs(((((startTime-Date.now())/1000)/60)/60)) + " hours",
        "start_date": new Date(startTime),
        "message_id": command.id,
        "message_send_date": new Date((command.id / 4194304) + 1420070400000),
        "sender_id": command.author.id,
        "sender_account_creation_date": new Date((command.author.id / 4194304) + 1420070400000),
        "server_id": command.channel.guild.id,
        "server_creation_date": new Date((command.channel.guild.id / 4194304) + 1420070400000),
        "channel_id": command.channel.id,
        "channel_creation_date": new Date((command.channel.id / 4194304) + 1420070400000),
        "latency": `${Date.now() - command.createdTimestamp}ms.`
    }
    var statsEmbed
    if(args[0])
    {
        switch(args[0])
        {
            case 'uptime':
                embed
                .setDescription('Bot stats')
                .addField("Bot Uptime", statistics.uptime, false)

                command.channel.send(embed);
                break;
            case 'startdate':
                embed
                .setDescription('Bot stats')
                .addField("Start Date", statistics.start_date, false)

                command.channel.send(embed);
                break;
            case 'messageid':
                embed
                .setDescription('Message stats')
                .addField("Message ID", statistics.message_id, false)

                command.channel.send(embed);
                break;
            case 'messagedate':
                embed
                .setDescription('Message stats')
                .addField("Send Date", statistics.message_send_date, false)

                command.channel.send(embed);
                break;
            case 'accountid':
            case 'userid':
            case 'myid':
                embed
                .setDescription('User stats')
                .addField(`User ID for <@${statistics.sender_id}>`, statistics.sender_id, false)

                command.channel.send(embed);
                break;
            case 'accountdate':
            case 'userdate':
                embed
                .setDescription('User stats')
                .addField(`Creation date for <@${statistics.sender_id}> `, statistics.sender_account_creation_date, false)

                command.channel.send(embed);
                break;
            case 'serverid':
                embed
                .setDescription('Server stats')
                .addField(`${command.guild.name} server ID `, statistics.server_id, false)

                command.channel.send(embed);
                break;
            case 'serverdate':
                embed
                .setDescription('Server stats')
                .addField(`${command.guild.name} creation date `, statistics.server_creation_date, false)

                command.channel.send(embed);
                break;
            case 'channelid':
                embed
                .setDescription('Server stats')
                .addField(`${command.channel.name} channel ID `, statistics.channel_id, false)

                command.channel.send(embed);
                break;
            case 'channeldate':
                embed
                .setDescription('Server stats')
                .addField(`${command.channel.name} creation date `, statistics.channel_creation_date, false)

                command.channel.send(embed);
                break;  
            case 'ping':
            case 'latency':
                embed
                .setDescription('Bot stats')
                .addField(`Latency`, statistics.latency, false)

                command.channel.send(embed);
                break;  

            default:
                try
                {
                    if(parseInt(args[0]))
                    {
                        let IDtoConvert = Number(args[0])
                        command.channel.send((new Date((IDtoConvert / 4194304) + 1420070400000)).toString())
                        
                    }
                    else
                    {
                        command.channel.send("The statistic was not recognized. Make sure it's a valid statistic, or enter a Discord ID which you'd like to get the date from.")
                    }
                }
                catch
                {

                }
                break;  
                
            
        }
    }
    else
    {
                statsEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Stats')
                .setAuthor('devbot')
                .setDescription('Server, message, user, and bot stats.')
                .addField("Bot Uptime", statistics.uptime, false)
                .addField("Bot start date", statistics.start_date, false)
                .addField("Message ID", statistics.message_id, false)
                .addField("Message Send Date", statistics.message_send_date, false)
                .addField("Sender ID", statistics.sender_id, false)
                .addField("Sender Account Creation Date", statistics.sender_account_creation_date, false)
                .addField("Server ID", statistics.server_id, false)
                .addField("Server Creation Date", statistics.server_creation_date, false)
                .addField("Channel ID", statistics.channel_id, false)
                .addField("Channel Creation Date", statistics.channel_creation_date, false)
                .addField("Latency", statistics.latency, false)
            
    
            command.channel.send(statsEmbed);
    }
            
}