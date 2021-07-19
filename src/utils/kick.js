module.exports = (guild, user, sendMessage, reason) =>
{
    if(reason && sendMessage)
    {
        user.send(`You have been kicked from ${guild.name} for ${reason}.`)
        return user.kick(reason)
    }
    if(sendMessage)
    {
        user.send(`You have been kicked from ${guild.name}.`)
        return user.kick(reason)
    }
    user.kick(reason)
    
}