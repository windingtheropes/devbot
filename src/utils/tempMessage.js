module.exports.send = (content, message, lifetime, type) => {
    try{
        if(!parseInt(liftime)) {
            return console.log
        }
    }
    catch
    {
        return
    }

    switch(type.toLowerCase())
    {
        case 'message':
            message.channel.send(content).then(m => {
                m.delete()
            })
            break;
        case 'reply': 
            message.reply(content).then(m => {
                m.delete()
            })
            break;
        default:
            return;
            break;
    }
    
}