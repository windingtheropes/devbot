const Discord = require('discord.js')

module.exports = {
    commands: ['stats'],
    
    callback: (command, args, text, client) => {
        
    var embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Stats')
            .setAuthor('devbot')
                
    var statistics = {
        uptime: {
            aliases : ['uptime'], 
            type : 'bot',
            title : 'Uptime',
            value : Math.abs(((((client.startTime-Date.now())/1000)/60)/60)) + " hours"},
        start_date: {
            aliases : ['startdate', 'starttime', 'started'], 
            type : 'bot',
            title : 'Start Date',
            value : new Date(client.startTime)},
        sender_id: {
            aliases : ['accountid', 'userid', 'myid'], 
            type : 'user',
            title : `User ID for ${command.author.username} (id ${command.author.id})`,
            value : command.author.id},
        sender_account_creation_date: {
            aliases : ['accountdate', 'userdate'], 
            type : 'user',
            title : `Account creation date for ${command.author.username} (id ${command.author.id})`,
            value : new Date((command.author.id / 4194304) + 1420070400000)},
        server_id: {
            aliases : ['serverid'], 
            type : 'server',
            title : `User ID for ${command.author.username} (id ${command.author.id})`,
            value : command.channel.guild.id},
        server_creation_date: {
            aliases : ['serverdate'], 
            type : 'user',
            title : `Account creation date for ${command.author.username} (id ${command.author.id})`,
            value : new Date((command.channel.guild.id / 4194304) + 1420070400000)},
        channel_id: {
            aliases : ['channelid'], 
            type : 'server',
            title : `Channel ID`,
            value : `${command.channel.name} channel ID`,
        channel_creation_date: {
            aliases : ['channeldate'], 
            type : 'user',
            title : `${command.channel.name} channel creation date `,
            value : new Date((command.channel.id / 4194304) + 1420070400000)},
        latency: {
            aliases : ['ping', 'latency'], 
            type : 'user',
            title : `Bot Ping`,
            value : `${client.ws.ping}ms.`}},
        
    }
    var statsEmbed
    if(args[0])
    {
        var embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Stats')
                .setAuthor('devbot')
        Object.keys(statistics).forEach(key => {
            let stat = statistics[key]
            stat.aliases.forEach(alias => {
                
                if(args[0] == alias)
                {
                    let description
                    switch(stat.type)
                    {
                        case 'bot':
                            description = "Bot stats"
                            break;
                        case 'server':
                            description = "Server stats"
                            break;
                        case 'user':
                            description = "User stats"
                            break;
                    }
                    embed
                        .setDescription(description)
                        .addField(stat.title, stat.value, false)
                    
                    command.channel.send(embed);
                    return

                }
            })

        });
        //so its not in the aliases list
        try
        {
            if(parseInt(args[0]))
            {
                let IDtoConvert = Number(args[0])
                command.channel.send((new Date((IDtoConvert / 4194304) + 1420070400000)).toString())
                return
            }
            else
            {
                command.channel.send("The statistic was not recognized. Make sure it's a valid statistic, or enter a Discord ID which you'd like to get the date from.")
                return
            }
        }
        catch
        {
            return
        }
    }
    else
    {
                statsEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Stats')
                .setAuthor('devbot')
                .setDescription('Server, message, user, and bot stats.')

                Object.keys(statistics).forEach(key => {
                    let stat = statistics[key]
                    statsEmbed.addField(stat.title, stat.value, false)
                });
            
            command.channel.send(statsEmbed);
    }      
    },
}