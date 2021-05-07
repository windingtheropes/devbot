const Discord = require('discord.js')
module.exports = poll

function poll(args, command)
{   
    //command.delete()
    //let message = ""
    //args.forEach(element => {
    //    message = message + " " + element
    //});

    let stage = 0 //1 = message 2+ = items
    let emojiStage = 0 //1 = emoji 2 = deff
    let items = []
    let message = ''
    let tempmsg = ''
    let tempemoji = ''
    let at2 = false
    try
    {
    
        switch(args[0]){
            case 'multiple':
                args.splice(0,1)

                args.forEach(element =>{
                    if(element === '||'){
                        stage = stage + 1
                    }
                    else
                    {
                        if(stage === 1){
                            message = `${message} ${element}`
                            console.log(args)
                        }
                        else if(stage >= 2)
                        {
                            
                                emojiStage = emojiStage + 1
                            
                            
                            if(emojiStage === 1){
                                tempemoji = element
                               
                            }
                            else if(emojiStage === 2)
                            {
                                
                                //issue: emoji deff cant have spaces..   
                                tempmsg = `${tempmsg} ${element}`
                                items.push([tempemoji, tempmsg])
                                emojiStage = 0
                                tempmsg =''
                            }
                            
                        }
                        console.log(items)
                    }
                });
                
                items.forEach(element =>{
                   message = `${message} \n${element[0]}: ${element[1]}`
                })
                command.channel.send(message).then(function(sentMessage) {
                    items.forEach(element =>{
                        sentMessage.react(element[0])
                    })
                    command.delete()
                });
                break;

                case 'yesno':
                    args.splice(0,1)
                    args.forEach(element =>{
                        message = `${message} ${element}`
                    })
                    command.channel.send(message).then(function(sentMessage) {
                        sentMessage.react('👍')
                        sentMessage.react('👎')
                        command.delete()
                    });
                    break;
                default:
                    command.channel.send('Please provide a valid poll type.')
                    break;
        }
    }
    catch
    {

    }
    
}
