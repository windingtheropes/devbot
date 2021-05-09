const Discord = require('discord.js')
module.exports = poll

function poll(args, command)
{   
    //command.delete()
    //let message = ''
    //args.forEach(element => {
    //    message = `${message} ${element}`
    //});

    var stage = 0 //1 = message 2+ = items
    var emojiStage = 0 //1 = emoji 2 = deff
    var items = []
    var message = ''
    
    var tempMsg = ''
    var tempEmoji = ''
    
    try
    {
    
        switch(args[0]){
            case 'multiple':
                args.splice(0,1)

                args.forEach(element =>{
                    if(element === ';;'){
                        stage = stage + 1
                        //some things that werent here before
                        if(stage >= 2)
                        {
                            if(emojiStage >= 2)
                            {
                                items.push([tempEmoji, tempMsg])
                                tempMsg = ''
                                //tempEmoji = ''
                                emojiStage = 0
                            }
                            
                        }
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

                                tempEmoji = element
                
                            }
                            else if(emojiStage >= 2)
                                {
                                
                                //issue: emoji deff cant have spaces..   
                                
                                tempMsg = `${tempMsg} ${element}`
                                //items.push([tempEmoji, tempMsg])
                                
                            }
                           // else if(emojiStage === 2)
                            //{
                                
                            //    //issue: emoji deff cant have spaces..   
                                
                           //     tempMsg = `${tempMsg} ${element}`
                          //      emojiStage = emojiStage + 1
                          //      items.push([tempEmoji, tempMsg])
                           //     emojiStage = 0
                           //     tempMsg = ''
                                
                                
                          //  }
                            
                        }
                        
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
