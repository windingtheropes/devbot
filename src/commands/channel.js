const Discord = require('discord.js')
module.exports = channel 

function channel(args, command)
    {
        if(command.channel.guild.id === '739521173116682281')
        {
            
            let method
            let type
            let name
            let err
            if(!args[0]){err = 1} else {method = args[0]} //check that its not blank
            switch (method) {
                case "create":
                    args.splice(0,1) //get the type
                    if(!args[0]){err = 1} else {type = args[0]} //check that its not blank
                    switch(type)
                    {
                        case "text":
                            break;
                         case "voice":
                            break;
                        default:
                            command.channel.send("You must provide a valid channel type.")
                            break;
                    }
                    args.splice(0,1) //get the name
                    if(!args[0]){command.channel.send("You must provide a channel name."); err = 1} else {name = args[0]} //check that its not blank

                    if(err!=1)
                    {
                        if(type === "text" || type === "voice") 
                        {
                            createChannel(type, name, command)
                        }
                        else
                        {
                            command.channel.send("Invalid type.")
                        }
                        
                    }
                    else
                    {
                        command.channel.send("Please provide the proper arguments.")
                    }
                    
                    break;
                default:
                    command.channel.send("You must provide a valid method.")
                    break;
            }
        }
        else
        {
            command.channel.send('Commanand unavailable in this server.')
        
        }
        
        
    }
    
    function createChannel(type, name, command)
    {
        command.guild.channels
            .create(name, {
                type: type,
            })
        command.channel.send("Created " + type + " channel `" + name + "`.")
    }