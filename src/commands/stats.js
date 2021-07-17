const Discord = require('discord.js')
const {version} = require('../config/config.json')

Object = require('../utils/object')


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
            type : 'Bot',
            title : 'Uptime',
            value : Math.abs(((((client.startTime-Date.now())/1000)/60)/60)) + " hours"},
        start_date: {
            aliases : ['startdate', 'starttime', 'started'], 
            type : 'Bot',
            title : 'Start Date',
            value : new Date(client.startTime)},
        sender_id: {
            aliases : ['accountid', 'userid', 'myid'], 
            type : 'User',
            title : `User ID for ${command.author.username} (id ${command.author.id})`,
            value : command.author.id},
        sender_account_creation_date: {
            aliases : ['accountdate', 'userdate'], 
            type : 'User',
            title : `Account creation date for ${command.author.username} (id ${command.author.id})`,
            value : new Date((command.author.id / 4194304) + 1420070400000)},
        server_id: {
            aliases : ['serverid'], 
            type : 'Server',
            title : `User ID for ${command.author.username}`,
            value : command.channel.guild.id},
        server_creation_date: {
            aliases : ['serverdate'], 
            type : 'Server',
            title : `${command.channel.guild.name} creation date`,
            value : new Date((command.channel.guild.id / 4194304) + 1420070400000)},
        channel_id: {
            aliases : ['channelid'], 
            type : 'Server',
            title : `#${command.channel.name} ID`,
            value : command.channel.id},
        channel_creation_date: {
            aliases : ['channeldate'], 
            type : 'Server',
            title : `#${command.channel.name} channel creation date `,
            value : new Date((command.channel.id / 4194304) + 1420070400000)},
        latency: {
            aliases: ['ping', 'latency'],
            type: 'Bot',
            title: 'Discord API Latency',
            value: `${client.ws.ping}ms`
        }
        
    }

    var statisticsDictionary = ['uptime', 'start_date', 'sender_id', 'sender_account_creation_date', 'server_id', 'server_creation_date', 'channel_id', 'channel_creation_date', 'latency']

    var statsEmbed
    if(args[0])
    {
        let handled = false
        var embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Stats')
                .setAuthor('devbot')
                .setFooter(`version ${version}`);
        Object.forEach(statistics, (stat) => {
            stat.aliases.forEach(alias => {
                if(args[0].toLowerCase() == alias){
                    embed
                        .setDescription(`${stat.type} stats`)
                        .addField(stat.title, stat.value, false)
                    command.channel.send(embed);
                    handled = true
                    return
                }
            })
        })
        if(!(handled))
        {
            command.channel.send("The statistic was not recognized.")
            return
        }
        
    }
    else
    {
                statsEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Stats')
                .setAuthor('devbot')
                .setDescription('Server, user, and bot stats.')
                .setFooter(`version ${version}`);
                Object.forEach(statistics, (stat) => {
                    statsEmbed.addField(stat.title, stat.value, false)
                })
            
            command.channel.send(statsEmbed);
    }      
    },
}